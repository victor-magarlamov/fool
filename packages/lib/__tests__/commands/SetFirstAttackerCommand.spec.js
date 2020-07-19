import SetFirstAttackerCommand from '../../src/commands/SetFirstAttackerCommand';
import { COMMANDS, COMMAND_STATUSES } from '../../src/constants';
import { getRandCard, getStore } from '../helper';

describe('SetFirstAttackerCommand', () => {
  let command = null;
  let store = null;

  beforeAll(() => {
    store = getStore();

    command = new SetFirstAttackerCommand({ store });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.SET_FIRST_ATTACKER);
  });

  describe('apply', () => {
    let result = null;

    beforeAll(() => {
      result = command.apply();
    });

    it('is completed', () => {
      expect(command.isCompleted).toBeTruthy();
    });

    it('returns the right result', () => {
      expect(result).toHaveProperty('type', COMMANDS.SET_FIRST_ATTACKER);
      expect(result).toHaveProperty('attacker');
    });
  });

  describe('setByTrump', () => {
    let g1 = null;
    let g2 = null;

    beforeAll(() => {
      g1 = store.gamblers[0];
      g2 = store.gamblers[1];
    });

    describe('when gamblers have no trump cards', () => {
      beforeAll(() => {
        g1.hand[store.deck.trump] = [];
        g2.hand[store.deck.trump] = [];
      });

      it('returns the first gambler', () => {
        expect(command.setByTrump()).toEqual(g1);
      });
    });

    describe('when only one gambler has trump cards', () => {
      beforeAll(() => {
        g1.hand[store.deck.trump] = [];
        g2.hand[store.deck.trump] = [store.deck.trump];
      });

      it('returns the second gambler', () => {
        expect(command.setByTrump()).toEqual(g2);
      });
    });
  });
});
