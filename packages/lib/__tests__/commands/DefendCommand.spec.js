import DefendCommand from '../../src/commands/DefendCommand';
import { COMMANDS, COMMAND_STATUSES } from '../../src/constants';
import { getStore, populateHand } from '../helper';

describe('DefendCommand', () => {
  let command = null;
  let store = null;

  beforeAll(() => {
    store = getStore();

    for (let gambler of store.gamblers) {
      populateHand(gambler, store);
    }

    const card = store.gamblers[1].getHand()[0];
    store.openedCards.push(card);
    store.gamblers[1].removeFromHand(card);

    command = new DefendCommand({ store: getStore() });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.DEFEND);
  });

  describe('apply', () => {
    let result = null;

    describe('when openedCards is not empty', () => {
      beforeAll(() => {
        command = new DefendCommand({ store });
        result = command.apply();
      });

      it('returns a card', () => {
        expect(result.card).not.toBeNull();
      });
    });
  });
});
