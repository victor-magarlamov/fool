import { GAMBLERS } from './constants';

export default class Gambler {
  index = null;
  hand = {};
  attacker = false;

  constructor({ index }) {
    this.index = index;
  }

  get name() {
    return `Gambler_${this.index}`;
  }

  get isAttacker() {
    return this.attacker;
  }

  get isRobot() {
    return this.index === GAMBLERS.ROBOT;
  }

  get isHandEmpty() {
    return [].concat(...Object.values(this.hand)).length === 0;
  }

  getHand(suit) {
    const arr = [].concat(...Object.values(this.hand));

    if (!suit) {
      return arr;
    }

    return arr
      .filter((card) => card.suit === suit)
      .sort((card_1, card_2) => card_1.rank <= card_2.rank);
  }

  addToHand(cards) {
    for (const card of cards) {
      if (!this.hand[card.rank]) {
        this.hand[card.rank] = [];
      }

      this.hand[card.rank].push(card);
    }
  }

  removeFromHand(card) {
    const cards = this.hand[card.rank].filter((c) => c.id !== card.id);
    this.hand[card.rank] = cards;

    return true;
  }
}
