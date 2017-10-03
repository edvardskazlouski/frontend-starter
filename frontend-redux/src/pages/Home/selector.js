import { createSelector } from 'reselect';
import { Selectors as RoutingSelectors } from '../../domains/routing';

export default createSelector(
  RoutingSelectors.route,
  route => ({
    route
  })
);