import Command from './Command';
import DiscardCardStrategy from '../strategies/DiscardCardStrategy';
import { COMMANDS } from '../constants';

export default class DiscardCardCommand extends Command {
  card = null;
  gambler = null;
  success = true;
  offsetY = null;

  constructor({ store, card, gambler }) {
    super(store, COMMANDS.DISCARD_CARD);

    this.card = card;
    this.gambler = gambler;
    store.updateSilence(true);
  }

  apply() {
    if (this.isActive) {
      this.perform();
      this.discardCard();
    }

    return {
      type: this.name,
      card: this.card,
      gambler: this.gambler,
      success: this.success,
    };
  }

  discardCard() {
    const strategy = new DiscardCardStrategy({ gambler: this.gambler });
    const res = strategy.discard(this.card, this.store.openedCards);

    if (res) {
      this.setPosition();
      this.moveCard();
      this.success = true;
    } else {
      this.complete();
      this.success = false;
    }
  }

  setPosition() {
    this.offsetY = 200;

    if (this.gambler.index === 1) {
      this.offsetY *= -1;
    }
  }

  moveCard() {
    const el = document.querySelector(`#${this.card.id}`);

    el.ontransitionend = () => {
      return this.complete();
    };

    el.classList.add('card--animation');
    el.style.transform = `translate3d(0px, ${this.offsetY}px, 0px)`;
  }
}
