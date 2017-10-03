import React from 'react';
import { Switch, Route } from 'react-router';

import { Constants as Routes } from '../domains/routing';

// views
import Home from '../pages/Home';
import Test from '../pages/Test';

const Router = () => (
  <Switch>
    <Route exact path={Routes.HOME} component={Home} />
    <Route exact path={Routes.TEST} component={Test} />
  </Switch>
);

export default Router;
