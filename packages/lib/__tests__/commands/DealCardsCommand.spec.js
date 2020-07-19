import DealCardsCommand from '../../src/commands/DealCardsCommand';
import { COMMANDS, COMMAND_STATUSES } from '../../src/constants';
import { getStore, mockDocument } from '../helper';

describe('DealCardsCommand', () => {
  let command = null;
  let store = null;
  let gambler = null;

  beforeAll(() => {
    mockDocument();
    store = getStore();
    gambler = store.gamblers[0];

    command = new DealCardsCommand({ store, gambler });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.DEAL_CARD);
  });
  
  describe('apply', () => {
    let result = null;

    beforeAll(() => {
      result = command.apply();
    });

    it('is in progress', () => {
      expect(command.status).toEqual(COMMAND_STATUSES.IN_PROGRESS);
    });
  });
});
