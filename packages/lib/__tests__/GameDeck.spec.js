import GameDeck from '../src/GameDeck';
import GameCard from '../src/GameCard';
import { SUITS, RANKS } from '../src/constants';

describe('GameDeck', () => {
  let deck = null;

  beforeAll(() => {
    deck = new GameDeck();
  });

  it('has the right number of cards', () => {
    expect(deck.cards).toHaveLength(Object.values(SUITS).length * Object.values(RANKS).length);
  });

  it('has a trump card', () => {
    expect(deck.trump).toBeInstanceOf(GameCard);
  });

  it('returns a card when pop', () => {
    expect(deck.pop()).toBeInstanceOf(GameCard);
  });

  it('returns the length of the cards', () => {
    expect(deck.length).toEqual(deck.cards.length);
  });
  
  it('returns false if the cards array is not empty', () => {
    expect(deck.isEmpty).toBeFalsy();
  });
});
