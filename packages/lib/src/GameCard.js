import { CARD_LABELS } from './constants';

const TRUMP_WEIGHT = 10;

export default class GameCard {
  id = null;
  suit = null;
  rank = null;
  weight = null;
  label = null;
  trump = false;

  constructor({ suit, rank }) {
    this.id = `card-${suit}-${rank}`;
    this.suit = suit;
    this.rank = rank;
    this.weight = rank;
    this.label = CARD_LABELS[rank];
  }

  get isTrump() {
    return this.trump;
  }

  setTrump(value) {
    this.trump = value;

    if (this.trump) {
      this.weight += TRUMP_WEIGHT;
    }
  }
}
