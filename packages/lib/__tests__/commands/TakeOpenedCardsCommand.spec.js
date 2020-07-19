import TakeOpenedCardsCommand from '../../src/commands/TakeOpenedCardsCommand';
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

    command = new TakeOpenedCardsCommand({
      store,
      gambler: store.gamblers[0],
    });
  });

  it('has the right name', () => {
    expect(command.name).toEqual(COMMANDS.TAKE_OPENED_CARDS);
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

      expect(el.style.transform).toEqual('translate3d(0px, -200px, 0px)');
    });
  });
});
