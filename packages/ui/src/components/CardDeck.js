import React, { memo } from 'react';
import PropTypes from 'prop-types';
import Card from './Card';
import './CardDeck.scss';

const CardDeck = memo(({ trumpCard, hidden }) => {
  if (hidden) {
    return <div className="card-deck" />;
  }

  return (
    <div className="card-deck">
      {trumpCard && (
        <Card trump suit={trumpCard.suit} label={trumpCard.label} />
      )}

      <Card deck side="back" />
    </div>
  );
});

CardDeck.displayName = 'CardDeck';

CardDeck.propTypes = {
  trumpCard: PropTypes.object,
  hidden: PropTypes.bool,
};

export default CardDeck;
