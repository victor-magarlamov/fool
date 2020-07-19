import CommandQueue from '../src/CommandQueue';
import StartNewRoundCommand from '../src/commands/StartNewRoundCommand';
import { getStore } from './helper';

jest.mock('../src/commands/StartNewRoundCommand');

describe('CommandQueue', () => {
  let queue = null;
  let store = null;

  beforeAll(() => {
    store = getStore();
  });

  describe('when the queue has no command', () => {
    beforeAll(() => {
      queue = new CommandQueue();
    });

    it('has the right size', () => {
      expect(queue.size).toBe(0);
    });

    it('returns null when execute', () => {
      expect(queue.execute()).toBe(null);
    });
  });

  describe('when a command is not completed', () => {
    beforeAll(() => {
      StartNewRoundCommand.mockImplementation(() => {
        return {
          apply: () => {
          },
          isCompleted: false,
        };
      });

      queue = new CommandQueue();
      const command = new StartNewRoundCommand(store);
      queue.enqueue(command);
    });

    it('has the right size', () => {
      expect(queue.size).toBe(1);
    });
    
    it('does not change size when execute', () => {
      queue.execute();

      expect(queue.size).toBe(1);
    });
  });

  describe('when a command is completed', () => {
    beforeAll(() => {
      StartNewRoundCommand.mockImplementation(() => {
        return {
          apply: () => {
          },
          isCompleted: true,
        };
      });

      queue = new CommandQueue();
      const command = new StartNewRoundCommand(store);
      queue.enqueue(command);
    });

    it('has the right size', () => {
      expect(queue.size).toBe(1);
    });
    
    it('changes size when execute', () => {
      queue.execute();

      expect(queue.size).toBe(0);
    });
  });
});
