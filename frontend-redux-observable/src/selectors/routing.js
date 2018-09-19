import { createSelector } from 'reselect';

const routingState = state => state.get('routing');

export const route = createSelector(
  routingState,
  routing => routing.getIn(['location', 'pathname'])
);
