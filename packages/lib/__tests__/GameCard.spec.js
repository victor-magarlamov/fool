import GameCard from '../src/GameCard';
import { CARD_LABELS } from '../src/constants';
import { getRandCard } from './helper';

describe('GameCard', () => {
  let card = null;

  beforeAll(() => {
    card = getRandCard();
  });

  it('generates the right id', () => {
    expect(card.id).toEqual(`card-${card.suit}-${card.rank}`);
  });
  
  it('has the right label', () => {
    expect(card.label).toEqual(CARD_LABELS[card.rank]);
  });

  describe('when it is a trump card', () => {
    beforeAll(() => {
      card.setTrump(true);
    });
    
    it('returns true for isTrump', () => {
      expect(card.isTrump).toBeTruthy();
    });

    it('has more weight', () => {
      const tempCard = new GameCard({ suit: card.suit, rank: card.rank });

      expect(card.weight).toBeGreaterThan(tempCard.weight);
    });
  });
});
