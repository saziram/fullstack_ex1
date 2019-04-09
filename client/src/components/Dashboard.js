import React, { Component } from 'react';
import Header from './shared/Header';

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

export default class Dashboard extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="container">Dashboard Components</div>
      </div>
    );
  }
}
