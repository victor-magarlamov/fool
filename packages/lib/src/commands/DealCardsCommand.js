import Command from './Command';
import { MIN_NUM_OF_CARDS, COMMANDS } from '../constants';

export default class DealCardsCommand extends Command {
  gambler = null;
  startX = 0;
  startY = 0;
  offsetX = 0;
  offsetY = 0;

  constructor({ store, gambler }) {
    super(store, COMMANDS.DEAL_CARD);

    this.gambler = gambler;
    store.updateSilence(true);
  }

  apply() {
    if (this.isActive) {
      this.perform();
      this.setPositions();
      this.dealCards();
    }

    return {
      type: this.name,
      gambler: this.gambler,
    };
  }

  setPositions() {
    const cardDeck = document.querySelector('.card-deck');
    const cardDeckRect = cardDeck.getBoundingClientRect();
    const gamerHand = document.querySelector(
      `.hand--${this.gambler.index + 1}`
    );
    const gamerHandRect = gamerHand.getBoundingClientRect();

    this.startX = cardDeckRect.x;
    this.startY = cardDeckRect.y;

    this.offsetX = gamerHandRect.x - this.startX;

    if (this.gambler.index === 0) {
      this.offsetY = Math.floor(gamerHandRect.bottom - this.startY - 100);
    } else {
      this.offsetY = Math.floor(gamerHandRect.top - this.startY);
    }
  }

  dealCards() {
    const { gambler, store } = this;
    let card = null;

    if (gambler.getHand().length >= MIN_NUM_OF_CARDS) {
      return this.complete();
    }

    card = store.popCardFromDeck();

    if (!card) {
      return this.complete();
    }

    const el = document.createElement('div');

    el.addEventListener('transitionend', () => {
      el.remove();

      gambler.addToHand([card]);
      store.updateGamblerHand(gambler);

      if (gambler.getHand().length >= MIN_NUM_OF_CARDS) {
        return this.complete();
      }

      this.dealCards();
    });

    document.querySelector('#root').appendChild(el);

    el.style.left = `${this.startX}px`;
    el.style.top = `${this.startY}px`;

    el.className = 'card card--back card--animation';

    setTimeout(() => {
      el.style.transform = `translate3d(${this.offsetX}px, ${this.offsetY}px, 0px)`;
    }, 0);
  }
}
