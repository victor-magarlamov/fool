import Command from './Command';
import { COMMANDS } from '../constants';

export default class StartNewRoundCommand extends Command {
  openedCards = null;

  constructor({ store }) {
    super(store, COMMANDS.START_NEW_ROUND);

    this.openedCards = store.openedCards;
    store.updateSilence(true);
  }

  apply() {
    if (this.isActive) {
      this.perform();
      this.moveCards();
    }

    return {
      type: this.name,
    };
  }

  moveCards() {
    const card = this.openedCards[this.openedCards.length - 1];
    const el = document.querySelector(`#${card.id}`);

    el.ontransitionend = () => {
      this.openedCards.pop();
      this.store.updateOpenedCards();
      this.store.banker.discardPile.push(card);

      if (this.openedCards.length > 0) {
        return this.moveCards();
      }

      return this.complete();
    };

    el.classList.add('card--animation');
    el.style.transform = `translate3d(1000px, 0px, 0px)`;
  }
}
