import React from 'react';
import { Switch, Route } from 'react-router';

import * as Routes from 'constants/routing';

// views
import Home from 'pages/Home';
import NotFound from 'pages/NotFound';

export default () => (
  <Switch>
    <Route exact path={Routes.HOME} component={Home} />
    <Route path="*" component={NotFound} />
  </Switch>
);
