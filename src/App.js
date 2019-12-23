

import React from 'react';
import { Route, Switch, withRouter } from "react-router-dom";
import AmountOfPlayers from './components/AmountOfPlayers/AmountOfPlayers'
import Layout from './hoc/Layout/Layout'

const App = props => {
  let routes = (
    <Switch>
      <Route path="/" component={AmountOfPlayers} />
     
      {/* <Route component={AmountOfPlayers} /> */}
    </Switch>
  );

  return (
    <div>
      <Layout>{routes}</Layout>
    </div>
  );
};

export default withRouter(App);



