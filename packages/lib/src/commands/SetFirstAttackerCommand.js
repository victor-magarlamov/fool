// choose the first attacker by trump card

import Command from './Command';
import { COMMANDS } from '../constants';

export default class SetFirstAttackerCommand extends Command {
  constructor({ store }) {
    super(store, COMMANDS.SET_FIRST_ATTACKER);
  }

  apply() {
    this.complete();

    return {
      type: this.name,
      attacker: this.setByTrump(),
    };
  }

  setByTrump() {
    const { trump } = this.store.deck;
    const g1 = this.store.gamblers[0];
    const g2 = this.store.gamblers[1];
    const g1Trump = g1.getHand(trump.suit)[0];
    const g2Trump = g2.getHand(trump.suit)[0];

    if (!g1Trump && !g2Trump) {
      return g1;
    }

    const g1Rank = g1Trump ? g1Trump.rank : 0;
    const g2Rank = g2Trump ? g2Trump.rank : 0;

    return g1Rank > g2Rank ? g1 : g2;
  }
}
