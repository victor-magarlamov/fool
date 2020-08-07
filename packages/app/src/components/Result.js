import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import useRedirect from '../hooks/useRedirect';
import './Result.scss';

const Result = ({ fool }) => {
  const setRedirectTo = useRedirect();

  useEffect(() => {
    setTimeout(() => {
      setRedirectTo('/');
    }, 5000);
  }, [setRedirectTo]);

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
