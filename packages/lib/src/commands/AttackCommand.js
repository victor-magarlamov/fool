import Command from './Command';
import { COMMANDS, GAMBLERS } from '../constants';

export default class AttackCommand extends Command {
  gambler = null;
  defender = null;
  openedCards = null;

  constructor({ store }) {
    super(store, COMMANDS.ATTACK);

    this.gambler = store.gamblers[GAMBLERS.ROBOT];
    this.defender = store.gamblers[GAMBLERS.HUMAN];
    this.openedCards = store.openedCards;
  }

  apply() {
    let card = null;

    if (!this.defender.isHandEmpty) {
      card = this.chooseCard();
    }

    this.complete();

    return {
      type: this.name,
      card,
    };
  }

  chooseCard() {
    if (this.openedCards.length === 0) {
      return this.gambler.getHand().sort((a, b) => a.weight > b.weight)[0];
    }

    const openedCardRanks = this.openedCards.map((card) => card.rank);

    const availableCards = this.gambler
      .getHand()
      .filter((card) => openedCardRanks.includes(card.rank))
      .sort((a, b) => a.weight > b.weight);

    return availableCards[0];
  }
}
