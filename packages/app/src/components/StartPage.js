import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './StartPage.scss';

const StartPage = () => {
  const [redirectTo, setRedirectTo] = useState(null);

  const onClickHandler = () => {
    setRedirectTo('/game');
  };

  if (redirectTo) {
    return <Redirect to={redirectTo} />;
  }

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
