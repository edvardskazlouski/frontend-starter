import { put, take } from 'redux-saga/effects';
import * as ActionCreators from 'actionCreators/views/home';
import * as HttpActionCreators from 'domains/http/actionsCreators';

export default function* homeSaga() {
  // yield put(HttpActionCreators.makeRequest(ActionCreators.getUsers()));
  // const action = yield take([
  //   'SUCCESS',
  //   'FAILED',
  // ]);
}
