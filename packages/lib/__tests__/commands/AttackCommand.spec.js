import AttackCommand from '../../src/commands/AttackCommand';
import { COMMANDS, COMMAND_STATUSES } from '../../src/constants';
import { getStore, populateHand } from '../helper';

describe('AttackCommand', () => {
  let command = null;
  let store = null;

  beforeAll(() => {
    store = getStore();

    for (let gambler of store.gamblers) {
      populateHand(gambler, store);
    }

    command = new AttackCommand({ store: getStore() });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.ATTACK);
  });

  describe('apply', () => {
    let result = null;

    describe('when openedCards is empty', () => {
      beforeAll(() => {
        command = new AttackCommand({ store });
        result = command.apply();
      });

      it('returns a card', () => {
        expect(result.card).not.toBeNull();
      });
    });
  });
});
