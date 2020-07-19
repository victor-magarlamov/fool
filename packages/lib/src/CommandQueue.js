class Item {
  constructor(command) {
    this.command = command;
    this.next = null;
  }

  get isCompleted() {
    return this.command.isCompleted;
  }

  execute() {
    return this.command.apply();
  }
}

export default class CommandQueue {
  constructor() {
    this.first = null;
    this.last = null;
    this.size = 0;
  }

  enqueue(command) {
    const newItem = new Item(command);

    if (!this.first) {
      this.first = newItem;
      this.last = newItem;
    } else {
      this.last.next = newItem;
      this.last = newItem;
    }

    this.size++;

    return this.size;
  }

  execute() {
    if (this.size === 0) {
      return null;
    }

    const res = this.first.execute();

    if (this.first.isCompleted) {
      this.dequeue();
      return res;
    }

    return null;
  }

  dequeue() {
    if (this.first === this.last) {
      this.last = null;
    }

    this.first = this.first.next;

    this.size--;
  }
}
