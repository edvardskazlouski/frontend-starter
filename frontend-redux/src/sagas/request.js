import { select, call } from 'redux-saga/effects';

import { requestWithBody } from 'services/api';
import { Selectors } from 'domains/user';

export function* request(method, endpoint, body) {
  const { accessToken } = Selectors;

  const token = yield select(accessToken);
  return yield call(requestWithBody, method, endpoint, token, body);
}
