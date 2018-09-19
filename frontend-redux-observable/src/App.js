import React  from 'react';

import Router from 'router';
import Header from 'components/Header';
import ModalsPortal from 'containers/ModalsPortal';

export default () => (
  <React.Fragment>
    <Header />
    <Router />
    <ModalsPortal />
  </React.Fragment>
);
