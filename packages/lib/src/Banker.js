import GameDeck from './GameDeck';

export default class Banker {
  store = null;

  attacker = null;

  deck = null;
  openedCards = [];
  discardPile = [];

  constructor({ store }) {
    this.store = store;
    this.deck = new GameDeck();
  }

  get isAttackerRobot() {
    return this.attacker.isRobot;
  }

  get isGameFinished() {
    return this.deck.isEmpty;
  }

  swapAttacker() {
    let nextIndex = this.attacker.index + 1;

    if (nextIndex >= this.store.gamblers.length) {
      nextIndex = 0;
    }

    this.setAttacker(this.store.gamblers[nextIndex]);
  }

  setAttacker(gambler) {
    if (this.attacker) {
      this.attacker.attacker = false;
    }

    gambler.attacker = true;
    this.attacker = gambler;
  }
}
