import React from 'react';
import PropTypes from 'prop-types';
import CardLabel from './CardLabel';
import cx from 'classnames';
import './Card.scss';

const Card = ({
  id,
  state,
  side = 'front',
  suit,
  label,
  trump,
  deck,
  onClick,
}) => {
  const cls = cx('card', {
    [`card--${side}`]: side,
    [`card--${state}`]: state,
    'card--trump': trump,
    'card--deck': deck,
  });

  return (
    <div id={id} className={cls} onClick={onClick}>
      <CardLabel suit={suit} label={label} position="top" />
      <CardLabel suit={suit} label={label} position="bottom" />
    </div>
  );
};

Card.propTypes = {
  id: PropTypes.string,
  state: PropTypes.string,
  side: PropTypes.oneOf(['front', 'back']),
  suit: PropTypes.oneOf(['clubs', 'spades', 'diamonds', 'hearts']),
  label: PropTypes.string,
  trump: PropTypes.bool,
  deck: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Card;
