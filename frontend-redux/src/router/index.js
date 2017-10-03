import React from 'react';
import { Switch, Route } from 'react-router';

import Home from '../pages/Home';

import { Constants as Routes } from '../domains/routing';

const Router = () => (
  <Switch>
    <Route exact path={Routes.HOME} component={Home} />
  </Switch>
);

export default Router;
