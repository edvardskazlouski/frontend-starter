import { createSelector } from 'reselect';
import { route } from '../../selectors/routing';

export default createSelector(
  route,
  route => ({
    route
  })
);
