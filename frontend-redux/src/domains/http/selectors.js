import { Map } from 'immutable';
import { createSelector } from 'reselect';

export const http = state => state.get('http', new Map());

export const requests = createSelector(
  http,
  http => http.get('requests'),
);

export const requestsSize = createSelector(
  requests,
  requests => requests.size,
);

export const averageProgress = createSelector(
  [requests, requestsSize],
  (requests, requestsSize) => requestsSize
    ? Math.floor(requests.reduce((accum, data) => accum + data) / requestsSize)
    : 0,
);
