import Banker from '../src/Banker';
import GameDeck from '../src/GameDeck';
import Gambler from '../src/Gambler';
import { GAMBLERS } from '../src/constants';
import { getStore } from './helper';

describe('Banker', () => {
  let banker = null;
  let store = null;

  beforeAll(() => {
    store = getStore();
    banker = new Banker({ store });
  });

  it('initializes the deck', () => {
    expect(banker.deck).toBeInstanceOf(GameDeck);
  });

  it('updates the attacker properties of the gambler', () => {
    const gambler = store.gamblers[0];
    gambler.attacker = false;

    banker.setAttacker(gambler);

    expect(gambler.isAttacker).toBeTruthy();
  });

  describe('when swapAttacker', () => {
    let g1 = null;
    let g2 = null;

    beforeAll(() => {
      g1 = store.gamblers[0];
      g2 = store.gamblers[1];

      g1.attacker = false;
      g2.attacker = false;
      
      banker.setAttacker(g1);
      banker.swapAttacker();
    });

    it('replaces current attacker', () => {
      expect(g2.isAttacker).toBeTruthy();
      expect(g1.isAttacker).toBeFalsy();
    });
  });
  
  describe('when attacker is robot', () => {
    let robot = null;

    beforeAll(() => {
      robot = new Gambler({ index: GAMBLERS.ROBOT });
      banker.setAttacker(robot);
    });

    it('returns true', () => {
      expect(banker.isAttackerRobot).toBeTruthy();
    });
  });

  describe('when attacker is not robot', () => {
    let gambler = null;

    beforeAll(() => {
      gambler = new Gambler({ index: GAMBLERS.HUMAN });
      banker.setAttacker(gambler);
    });

    it('returns false', () => {
      expect(banker.isAttackerRobot).toBeFalsy();
    });
  });
});
