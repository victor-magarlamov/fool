import StartNewRoundCommand from '../../src/commands/StartNewRoundCommand';
import { COMMANDS, COMMAND_STATUSES } from '../../src/constants';
import { getStore, getRandCard, mockDocument, mockOpenCard } from '../helper';

describe('TakeOpenedCardsCommand', () => {
  let command = null;
  let store = null;
  let card = null;

  beforeAll(() => {
    mockDocument();
    store = getStore();

    card = getRandCard();
    store.openedCards.push(card);
    mockOpenCard(card);

    command = new StartNewRoundCommand({ store });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.START_NEW_ROUND);
  });

  describe('apply', () => {
    let result = null;

    beforeAll(() => {
      result = command.apply();
    });

    it('is in progress', () => {
      expect(command.status).toEqual(COMMAND_STATUSES.IN_PROGRESS);
    });

    it('changes the classList of the element', () => {
      const el = document.querySelector(`#${card.id}`);

      expect(el.classList.contains('card--animation')).toBeTruthy();
    });

    it('changes the style of the element', () => {
      const el = document.querySelector(`#${card.id}`);

      expect(el.style.transform).toEqual('translate3d(1000px, 0px, 0px)');
    });
  });
});
