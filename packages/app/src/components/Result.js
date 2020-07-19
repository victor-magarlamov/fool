import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
import './Result.scss';

const Result = ({ fool }) => {
  const [redirectTo, setRedirectTo] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      setRedirectTo('/');
    }, 5000);
  }, []);

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

  return (
    <div className="result">
      <div className="fool">
        <div className="fool__icon" />
        <div className="fool__text">Hail to the fool!</div>
        <div className="fool__name">{fool.name}</div>
      </div>
    </div>
  );
};

Result.propTypes = {
  fool: PropTypes.shape({
    name: PropTypes.string,
  }),
};

export default Result;
