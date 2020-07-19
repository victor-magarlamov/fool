export default class DiscardCardStrategy {
  strategy = null;
  gambler = null;

  constructor({ gambler }) {
    this.gambler = gambler;

    this.strategy = gambler.isAttacker
      ? DiscardCardStrategy.Attacker
      : DiscardCardStrategy.Defender;
  }

  discard(card, openedCards) {
    const res = this.strategy({ card, openedCards });

    if (res) {
      return this.gambler.removeFromHand(card);
    }

    return false;
  }

  static Defender({ card, openedCards }) {
    if (openedCards.length === 0) {
      return false;
    }

    const lastCard = openedCards[openedCards.length - 1];

    return (
      (card.isTrump && !lastCard.isTrump) ||
      (lastCard.suit === card.suit && lastCard.rank < card.rank)
    );
  }

  static Attacker({ card, openedCards }) {
    if (
      openedCards.length > 0 &&
      openedCards.some((i) => i.rank === card.rank) === false
    ) {
      return false;
    }

    return true;
  }
}
