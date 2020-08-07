import React from 'react';
import useRedirect from '../hooks/useRedirect';
import './StartPage.scss';

const StartPage = () => {
  const setRedirectTo = useRedirect();

  const onClickHandler = () => {
    setRedirectTo('/game');
  };

  return (
    <div className="start-page">
      <div className="title" onClick={onClickHandler}>
        <h1 className="title__header">Fool</h1>
        <div className="title__fool" />
        <div className="title__subheader">Russian Card Game</div>
      </div>
    </div>
  );
};

export default StartPage;
