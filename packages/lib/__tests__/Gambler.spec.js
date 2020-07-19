import Gambler from '../src/Gambler.js';
import { getRandCard } from './helper';

describe('Gambler', () => {
  let gambler = null;
  let robot = null;

  beforeAll(() => {
    gambler = new Gambler({ index: 1, robot: false });
    robot = new Gambler({ index: 2 });
  });

  it('has the right name', () => {
    expect(gambler.name).toEqual(`Gambler_${gambler.index}`);
  });
  
  it('returns true when it is a robot', () => {
    expect(robot.isRobot).toBeTruthy;
  });

  it('returns false when it is not a robot', () => {
    expect(gambler.isRobot).toBeFalsy;
  });

  it('returns true when the hand array is empty', () => {
    expect(gambler.isHandEmpty).toBeTruthy;
  });

  describe('when insert / remove a card', () => {
    let card = null;

    beforeAll(() => {
      card = getRandCard();
      gambler.addToHand([card]);
    });

    it('returns false', () => {
      expect(gambler.isHandEmpty).toBeFalsy;
    });

    it('has the right cards into the hand', () => {
      expect(gambler.hand[card.rank]).toEqual([card]);
    });

    it('contains the card in the hand array', () => {
      expect(gambler.getHand()).toContain(card);
    });

    it('removes the card', () => {
      gambler.removeFromHand(card);
      expect(gambler.getHand()).not.toContain(card);
    });
  });
});
