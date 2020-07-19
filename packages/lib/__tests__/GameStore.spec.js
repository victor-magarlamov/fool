import GameStore from '../src/GameStore';
import Banker from '../src/Banker';
import CommandQueue from '../src/CommandQueue';
import Gambler from '../src/Gambler';
import GameDeck from '../src/GameDeck';
import GameCard from '../src/GameCard';

describe('GameStore', () => {
  let store = null;

  beforeAll(() => {
    store = new GameStore({ setData: Function.prototype });
  });

  it('has the right initializing state', () => {
    expect(store.banker).toBeInstanceOf(Banker);
    expect(store.queue).toBeInstanceOf(CommandQueue);
    expect(store.gamblers).toHaveLength(2);
    expect(store.deck).toBeInstanceOf(GameDeck);
    expect(store.trump).toBeInstanceOf(GameCard);
    expect(store.openedCards).toHaveLength(0);
  });
});

