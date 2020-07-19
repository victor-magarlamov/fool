import { COMMAND_STATUSES } from '../constants';

export default class Command {
  status = COMMAND_STATUSES.ACTIVE;
  store = null;
  name = null;

  constructor(store, name) {
    this.store = store;
    this.name = name;
  }

  get isActive() {
    return this.status === COMMAND_STATUSES.ACTIVE;
  }

  get isCompleted() {
    return this.status === COMMAND_STATUSES.COMPLETED;
  }

  perform() {
    this.status = COMMAND_STATUSES.IN_PROGRESS;
  }

  complete() {
    this.status = COMMAND_STATUSES.COMPLETED;
  }
}
