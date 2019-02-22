import { Map } from 'immutable';
import { createSelector } from 'reselect';

export const user = state => state.get('user', new Map());

export const currentUserRole = createSelector(
  user,
  user => user.get('role'),
);

export const accessToken = createSelector(
  user,
  user => user.get('accessToken'),
);
