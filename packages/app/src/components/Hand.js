import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Card } from '@fool/ui';
import './Hand.scss';

const Hand = memo(({ className, cards, side, onCardClick }) => (
  <div className={className}>
    {cards.map((card) => (
      <Card
        key={`${card.suit}-${card.rank}`}
        id={card.id}
        suit={card.suit}
        rank={card.rank}
        label={card.label}
        side={side}
        onClick={onCardClick ? onCardClick(card) : null}
      />
    ))}
  </div>
));

Hand.displayName = 'Hand';

Hand.propTypes = {
  className: PropTypes.string,
  onCardClick: PropTypes.func,
  cards: PropTypes.array,
  side: PropTypes.oneOf(['back']),
};

export default Hand;
