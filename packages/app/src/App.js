import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StartPage from './components/StartPage';
import GamePage from './components/GamePage';

function App() {
  return (
    <Switch>
      <Route path="/game" exact component={GamePage} />
      <Route path="/" component={StartPage} />
    </Switch>
  );
}

export default App;
