import GameCard from './GameCard';
import { SUITS, RANKS } from './constants';

export default class GameDeck {
  cards = [];
  trump = null;

  constructor() {
    this.initCards();
    this.shuffle();
    this.setTrump();
  }

  get isEmpty() {
    return this.cards.length === 0;
  }

  get length() {
    return this.cards.length;
  }

  initCards() {
    this.cards = [];

    for (let suit of Object.values(SUITS)) {
      for (let rank of Object.values(RANKS)) {
        this.cards.push(new GameCard({ suit, rank }));
      }
    }
  }

  shuffle() {
    const { cards } = this;

    for (let i = cards.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
  }

  setTrump() {
    this.trump = this.cards[0];

    this.cards
      .filter((card) => card.suit === this.trump.suit)
      .forEach((card) => card.setTrump(true));
  }

  pop() {
    return this.cards.pop();
  }
}
