import Banker from './Banker';
import Gambler from './Gambler';
import CommandQueue from './CommandQueue';
import SetFirstAttackerCommand from './commands/SetFirstAttackerCommand';
import DealCardsCommand from './commands/DealCardsCommand';
import DiscardCardCommand from './commands/DiscardCardCommand';
import AttackCommand from './commands/AttackCommand';
import DefendCommand from './commands/DefendCommand';
import TakeOpenedCardsCommand from './commands/TakeOpenedCardsCommand';
import StartNewRoundCommand from './commands/StartNewRoundCommand';
import { COMMANDS, GAMBLERS, ACTIONS } from './constants';

export default class GameStore {
  fool = null;
  banker = null;
  gamblers = [];
  queue = null;
  setData = null;
  userAction = null;

  constructor({ setData }) {
    this.queue = new CommandQueue();
    this.setData = setData;

    this.initBanker();
    this.initGamblers();
    this.initFirstCommands();

    requestAnimationFrame(() => {
      this.run();
    });
  }

  initBanker() {
    this.banker = new Banker({ store: this });

    this.updateCardLength();
    this.updateTrump();
  }

  initGamblers() {
    this.gamblers = [
      new Gambler({ index: GAMBLERS.ROBOT }),
      new Gambler({ index: GAMBLERS.HUMAN }),
    ];
  }

  initFirstCommands() {
    for (let gambler of this.gamblers) {
      this.queue.enqueue(new DealCardsCommand({ store: this, gambler }));
    }

    this.queue.enqueue(new SetFirstAttackerCommand({ store: this }));
  }

  run = () => {
    const res = this.queue.execute();

    if (res) {
      switch (res.type) {
        case COMMANDS.SET_FIRST_ATTACKER: {
          this.banker.setAttacker(res.attacker);
          this.updateAttacker();
          this.updateSilence(false);

          if (this.banker.isAttackerRobot) {
            this.queue.enqueue(new AttackCommand({ store: this }));
          }

          break;
        }
        case COMMANDS.DEAL_CARD: {
          this.updateSilence(false);

          break;
        }
        case COMMANDS.DISCARD_CARD: {
          if (res.success) {
            this.openedCards.push(res.card);
            this.updateOpenedCards();

            this.updateGamblerHand(res.gambler);

            if (this.banker.isGameFinished) {
              if (res.gambler.isHandEmpty) {
                const foolIndex = res.gambler.isRobot ? 1 : 0;

                this.setFool(this.gamblers[foolIndex]);

                break;
              }
            }

            if (!res.gambler.isRobot) {
              if (!this.banker.isAttackerRobot) {
                this.queue.enqueue(new DefendCommand({ store: this }));
              } else {
                this.queue.enqueue(new AttackCommand({ store: this }));
              }
            }
          }

          this.updateSilence(false);

          break;
        }
        case COMMANDS.ATTACK: {
          if (res.card) {
            this.queue.enqueue(
              new DiscardCardCommand({
                store: this,
                card: res.card,
                gambler: this.gamblers[GAMBLERS.ROBOT],
              })
            );
          } else {
            this.queue.enqueue(new StartNewRoundCommand({ store: this }));

            this.queue.enqueue(
              new DealCardsCommand({
                store: this,
                gambler: this.gamblers[GAMBLERS.ROBOT],
              })
            );

            this.queue.enqueue(
              new DealCardsCommand({
                store: this,
                gambler: this.gamblers[GAMBLERS.HUMAN],
              })
            );
          }

          break;
        }
        case COMMANDS.DEFEND: {
          if (res.card) {
            this.queue.enqueue(
              new DiscardCardCommand({
                store: this,
                card: res.card,
                gambler: this.gamblers[GAMBLERS.ROBOT],
              })
            );
          } else {
            this.queue.enqueue(
              new TakeOpenedCardsCommand({
                store: this,
                gambler: this.gamblers[GAMBLERS.ROBOT],
              })
            );

            this.queue.enqueue(
              new DealCardsCommand({
                store: this,
                gambler: this.gamblers[GAMBLERS.ROBOT],
              })
            );

            this.queue.enqueue(
              new DealCardsCommand({
                store: this,
                gambler: this.gamblers[GAMBLERS.HUMAN],
              })
            );
          }

          break;
        }
        case COMMANDS.START_NEW_ROUND: {
          this.banker.swapAttacker();
          this.updateAttacker();
          this.updateSilence(false);

          if (this.banker.isAttackerRobot) {
            this.queue.enqueue(new AttackCommand({ store: this }));
          }

          this.updateSilence(false);

          break;
        }
      }
    }

    requestAnimationFrame(this.run);
  };

  get deck() {
    return this.banker.deck;
  }

  get trump() {
    return this.deck.trump;
  }

  get openedCards() {
    return this.banker.openedCards;
  }

  popCardFromDeck() {
    const card = this.deck.pop();

    if (!card) {
      this.updateCardLength();
    }

    return card;
  }

  layCard(card) {
    this.queue.enqueue(
      new DiscardCardCommand({
        store: this,
        card,
        gambler: this.gamblers[GAMBLERS.HUMAN],
      })
    );
  }

  takeCards() {
    this.queue.enqueue(
      new TakeOpenedCardsCommand({
        store: this,
        gambler: this.gamblers[GAMBLERS.HUMAN],
      })
    );

    this.queue.enqueue(
      new DealCardsCommand({
        store: this,
        gambler: this.gamblers[GAMBLERS.ROBOT],
      })
    );

    this.queue.enqueue(
      new DealCardsCommand({
        store: this,
        gambler: this.gamblers[GAMBLERS.HUMAN],
      })
    );

    this.queue.enqueue(new AttackCommand({ store: this }));
  }

  hangUp() {
    this.queue.enqueue(new StartNewRoundCommand({ store: this }));

    this.queue.enqueue(
      new DealCardsCommand({
        store: this,
        gambler: this.gamblers[GAMBLERS.ROBOT],
      })
    );

    this.queue.enqueue(
      new DealCardsCommand({
        store: this,
        gambler: this.gamblers[GAMBLERS.HUMAN],
      })
    );
  }

  setFool(gambler) {
    this.fool = gambler;
    this.updateFool();
  }

  updateSilence(value) {
    this.setData(ACTIONS.SET_SILENCE, value);
  }

  updateTrump() {
    this.setData(ACTIONS.SET_TRUMP, this.trump);
  }

  updateCardLength() {
    this.setData(ACTIONS.SET_DECK_LENGTH, this.deck.length);
  }

  updateAttacker() {
    this.setData(ACTIONS.SET_ATTACKER, this.banker.attacker);
  }

  updateGamblerHand(gambler) {
    const action = gambler.isRobot
      ? ACTIONS.SET_ROBOT_HAND
      : ACTIONS.SET_HUMAN_HAND;

    this.setData(action, [...gambler.getHand()]);
  }

  updateOpenedCards() {
    this.setData(ACTIONS.SET_OPENED_CARDS, [...this.banker.openedCards]);
  }

  updateFool() {
    this.setData(ACTIONS.SET_FOOL, this.fool);
  }
}
