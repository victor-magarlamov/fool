import DiscardCardCommand from '../../src/commands/DiscardCardCommand';
import { COMMANDS, COMMAND_STATUSES } from '../../src/constants';
import { getStore, mockDocument, mockCards, populateHand } from '../helper';

describe('DiscardCardCommand', () => {
  let command = null;
  let store = null;
  let card = null;
  let gambler = null;
  
  beforeAll(() => {
    mockDocument();
    
    store = getStore();
    gambler = store.gamblers[0];

    populateHand(gambler, store);
    
    card = gambler.getHand()[0];
    mockCards(gambler.index + 1, gambler.getHand());

    command = new DiscardCardCommand({ store, gambler, card });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.DISCARD_CARD);
  });

  describe('apply', () => {
    let result = null;

    describe('when opennedCards is empty', () => {
      describe('when gambler is an attacker', () => {
        beforeAll(() => {
          gambler.attacker = true;
          command = new DiscardCardCommand({ store, gambler, card });
          result = command.apply();
        });

        it('is in progress', () => {
          expect(command.status).toEqual(COMMAND_STATUSES.IN_PROGRESS);
        });
      });

      describe('when gambler is not an attacker', () => {
        beforeAll(() => {
          gambler.attacker = false;
          command = new DiscardCardCommand({ store, gambler, card });
          result = command.apply();
        });

        it('is completed', () => {
          expect(command.status).toEqual(COMMAND_STATUSES.COMPLETED);
        });

        it('returns false', () => {
          expect(result.success).toBeFalsy();
        });
      });
    });
  });
});
