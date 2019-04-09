import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import Dashboard from './components/Dashboard';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Redirect from="/" to="/dashboard" exact />
          <Route path="/dashboard" component={Dashboard} />>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
