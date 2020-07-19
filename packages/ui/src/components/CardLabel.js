import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import './CardLabel.scss';

const CardLabel = ({ suit, label, position }) => {
  const cls = cx('card-label', {
    [`card-label--${suit}`]: suit,
    [`card-label--${position}`]: position,
  });

  return (
    <div className={cls}>
      <div className="card-label__rank">{label}</div>
      <div className="card-label__suit" />
    </div>
  );
};

CardLabel.propTypes = {
  suit: PropTypes.oneOf(['clubs', 'spades', 'diamonds', 'hearts']),
  label: PropTypes.string,
  position: PropTypes.oneOf(['bottom', 'top']),
};

export default CardLabel;
