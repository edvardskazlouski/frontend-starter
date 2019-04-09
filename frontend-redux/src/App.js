import React, { Component } from 'react';

import Router from 'router';
import Header from 'components/Header';
import ModalPortals from 'components/ModalsPortal';
import Loading from 'components/Loading';
import ProgressLine  from 'components/ProgressLine';

class App extends Component {
  render() {
    return (
      <Loading>
        <ProgressLine />
        <Header />
        <Router />
        <ModalPortals />
      </Loading>
    );
  }
}

export default App;
