

import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import AmountOfPlayers from './components/AmountOfPlayers/AmountOfPlayers'
import InsertNames from './components/InsertNames/InsertNames'
import Game from './components/Game/Game'
import Layout from './hoc/Layout/Layout'

const App = props => {
  let routes = (
    <Switch>
      <Route path="/insertNames/:amount" component={InsertNames} />
      <Route path="/game" component={Game} />
      <Route path="/" component={AmountOfPlayers} />
    </Switch>
  );

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default withRouter(App);



