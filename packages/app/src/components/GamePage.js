import React, { useState, useEffect, useMemo } from 'react';
import { Store, ACTIONS } from '@fool/lib';
import { Card, CardDeck, Button } from '@fool/ui';
import Hand from './Hand';
import Result from './Result';
import './GamePage.scss';

let store = null;

const GamePage = () => {
  const [silence, setSilence] = useState(true);
  const [attacker, setAttacker] = useState(null);
  const [cardLength, setCardLength] = useState(0);
  const [trumpCard, setTrumpCard] = useState(null);
  const [robotCards, setRobotCards] = useState([]);
  const [humanCards, setHumanCards] = useState([]);
  const [openedCards, setOpenedCards] = useState([]);
  const [fool, setFool] = useState(null);

  useEffect(() => {
    const setData = (resource, data) => {
      switch (resource) {
        case ACTIONS.SET_ATTACKER:
          return setAttacker(data);
        case ACTIONS.SET_DECK_LENGTH:
          return setCardLength(data);
        case ACTIONS.SET_TRUMP:
          return setTrumpCard(data);
        case ACTIONS.SET_ROBOT_HAND:
          return setRobotCards(data);
        case ACTIONS.SET_HUMAN_HAND:
          return setHumanCards(data);
        case ACTIONS.SET_OPENED_CARDS:
          return setOpenedCards(data);
        case ACTIONS.SET_FOOL:
          return setFool(data);
        case ACTIONS.SET_SILENCE:
          return setSilence(data);
      }
    };

    store = new Store({ setData });
  }, []);

  const handleCardClick = (card) => () => {
    store.layCard(card);
  };

  const handleTakeCardsClick = () => {
    store.takeCards();
  };

  const handleHangUpClick = () => {
    store.hangUp();
  };

  const pairCards = useMemo(() => {
    return openedCards.reduce((acc, card) => {
      const len = acc.length - 1;

      if (!acc[len] || acc[len].length === 2) {
        acc.push([card]);
      } else {
        acc[len].push(card);
      }

      return acc;
    }, []);
  }, [openedCards]);

  const canShowTakeButton = useMemo(
    () =>
      !silence && attacker && attacker.isRobot && openedCards.length % 2 > 0,
    [silence, attacker, openedCards]
  );

  const canShowHangUpButton = useMemo(
    () =>
      !silence &&
      attacker &&
      !attacker.isRobot &&
      openedCards.length > 0 &&
      openedCards.length % 2 === 0,
    [silence, attacker, openedCards]
  );

  return (
    <div className="game-page">
      <Hand className="hand--1" cards={robotCards} side="back" />

      <div className="cards">
        <div className="deck">
          <CardDeck trumpCard={trumpCard} hidden={cardLength === 0} />
        </div>

        <div className="game-zone">
          {pairCards.map((cards, index) => (
            <div className="card-pair" key={`painr-${index}`}>
              {cards.map((card) => (
                <Card
                  key={card.id}
                  id={card.id}
                  suit={card.suit}
                  rank={card.rank}
                  label={card.label}
                  state="active"
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="action-panel">
        {canShowTakeButton && (
          <Button label="Take it!" onClick={handleTakeCardsClick} />
        )}

        {canShowHangUpButton && (
          <Button label="Hand up!" onClick={handleHangUpClick} />
        )}
      </div>

      <Hand
        className="hand--2"
        cards={humanCards}
        onCardClick={handleCardClick}
      />

      {fool && <Result fool={fool} />}
    </div>
  );
};

export default GamePage;
