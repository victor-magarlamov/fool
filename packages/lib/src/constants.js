export const MIN_NUM_OF_CARDS = 6;

export const GAMBLERS = {
  ROBOT: 0,
  HUMAN: 1,
};

export const SUITS = {
  DIAMONDS: 'diamonds',
  HEARTS: 'hearts',
  CLUBS: 'clubs',
  SPADES: 'spades',
};

export const RANKS = {
  SIX: 6,
  SEVEN: 7,
  EIGhT: 8,
  NINE: 9,
  TEN: 10,
  JACK: 11,
  QUEEN: 12,
  KING: 13,
  ACE: 14,
};

export const CARD_LABELS = {
  6: '6',
  7: '7',
  8: '8',
  9: '9',
  10: '10',
  11: 'J',
  12: 'Q',
  13: 'K',
  14: 'A',
};

export const COMMAND_STATUSES = {
  ACTIVE: 'ACTIVE',
  IN_PROGRESS: 'IN_PROGRESS',
  COMPLETED: 'COMPLETED',
};

export const COMMANDS = {
  ATTACK: 'AttackCommand',
  DEAL_CARD: 'DealCardsCommand',
  DEFEND: 'DefendCommand',
  DISCARD_CARD: 'DiscardCardCommand',
  SET_FIRST_ATTACKER: 'SetFirstAttackerCommand',
  START_NEW_ROUND: 'StartNewRoundCommand',
  TAKE_OPENED_CARDS: 'TakeOpenedCardsCommand',
};

export const ACTIONS = {
  SET_SILENCE: 0,
  SET_TRUMP: 1,
  SET_DECK_LENGTH: 2,
  SET_ATTACKER: 3,
  SET_HUMAN_HAND: 4,
  SET_ROBOT_HAND: 5,
  SET_OPENED_CARDS: 6,
  SET_FOOL: 7,
};
