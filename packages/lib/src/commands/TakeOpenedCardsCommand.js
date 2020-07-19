import Command from './Command';
import { COMMANDS } from '../constants';

export default class TakeOpenedCardsCommand extends Command {
  banker = null;
  gambler = null;

  constructor({ store, gambler }) {
    super(store, COMMANDS.TAKE_OPENED_CARDS);

    this.banker = store.banker;
    this.gambler = gambler;
  }

  apply() {
    if (this.isActive) {
      this.perform();
      this.moveCards();
    }

    return {
      type: this.name,
      gambler: this.gambler,
    };
  }

  moveCards() {
    const { gambler, banker } = this;
    const offsetY = gambler.isRobot ? -200 : 200;
    const card = banker.openedCards[banker.openedCards.length - 1];
    const el = document.querySelector(`#${card.id}`);

    el.ontransitionend = () => {
      banker.openedCards.pop();
      this.store.updateOpenedCards();
      gambler.addToHand([card]);

      this.store.updateGamblerHand(gambler);

      if (banker.openedCards.length > 0) {
        return this.moveCards();
      }

      return (this.status = 'COMPLETED');
    };

    el.classList.add('card--animation');
    el.style.transform = `translate3d(0px, ${offsetY}px, 0px)`;
  }
}
