import GameStore from '../src/GameStore';
import GameCard from '../src/GameCard';
import { SUITS, RANKS } from '../src/constants';

export function getStore () {
  return new GameStore({ setData: Function.prototype });
}

export function populateHand (gambler, store) {
  const cards = store.banker.deck.cards.splice(0, 6);
  gambler.addToHand(cards);
}

export function getRandCard () {
  const suits = Object.values(SUITS);
  const ranks = Object.values(RANKS);

  const randSuit = suits[Math.floor(Math.random() * suits.length)];
  const randRank = ranks[Math.floor(Math.random() * ranks.length)];

  return new GameCard({ suit: randSuit, rank: randRank });
}

export function mockDocument () {
  const root = document.createElement('div');
  root.id = 'root';
  document.body.appendChild(root);
  
  const deckContainer = document.createElement('div');
  deckContainer.className = 'card-deck';
  document.body.appendChild(deckContainer);
  
  const g1Container = document.createElement('div');
  g1Container.className = 'hand--1';
  document.body.appendChild(g1Container);

  const g2Container = document.createElement('div');
  g2Container.className = 'hand--2';
  document.body.appendChild(g2Container);
  
  const gameZoneContainer = document.createElement('div');
  gameZoneContainer.className = 'game-zone';
  document.body.appendChild(gameZoneContainer);
}

export function mockCards (handId, cards) {
  const container = document.querySelector(`.hand--${handId}`);

  for (let card of cards) {
    const el = document.createElement('div');
    el.id = card.id;
    container.appendChild(el);
  }
}

export function mockOpenCard (card) {
  const container = document.querySelector('.game-zone');

  const el = document.createElement('div');
  el.id = card.id;
  container.appendChild(el);
}
