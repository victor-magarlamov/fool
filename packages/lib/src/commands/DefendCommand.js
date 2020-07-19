import Command from './Command';
import { COMMANDS, GAMBLERS } from '../constants';

export default class DefendCommand extends Command {
  gambler = null;
  openedCards = null;

  constructor({ store }) {
    super(store, COMMANDS.DEFEND);

    this.gambler = store.gamblers[GAMBLERS.ROBOT];
    this.openedCards = store.openedCards;
  }

  apply() {
    const card = this.chooseCard();
    this.complete();

    return {
      type: this.name,
      card,
    };
  }

  chooseCard() {
    const lastCard = this.openedCards[this.openedCards.length - 1];
    const cards = this.gambler.getHand();

    let availableCards = cards.filter((card) => {
      return card.suit === lastCard.suit && card.weight > lastCard.weight;
    });

    if (availableCards.length === 0 && !lastCard.isTrump) {
      availableCards = cards.filter((card) => card.isTrump);
    }

    return availableCards.sort((a, b) => a.weight - b.weight)[0];
  }
}
