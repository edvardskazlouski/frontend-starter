import { Map } from 'immutable';
import { createSelector } from 'reselect';

export const http = state => state.get('http', new Map());

export const progress = createSelector(
  http,
  http => http.get('progress'),
);

export const isActive = createSelector(
  http,
  http => http.get('isActive'),
);
