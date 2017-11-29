import React, { Component } from 'react';

import Router from 'router';
import Header from 'components/Header';
import ModalPortals from 'components/ModalsPortal';
import Loading from 'components/Loading';

class App extends Component {
  render() {
    return (
      <Loading>
        <Header />
        <Router />
        <ModalPortals />
      </Loading>
    );
  }
}

export default App;
