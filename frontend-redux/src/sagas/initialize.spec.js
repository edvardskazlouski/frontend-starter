import { expectSaga, testSaga } from 'redux-saga-test-plan';
import initializeSaga from './initialize';
import {
  startLoading,
  stopLoading,
} from 'actionCreators/loading';

test('exact order with redux-saga-test-plan', () => {
  testSaga(initializeSaga)
  .next()
  .put(startLoading())
  .next()
  .delay(3000)
  .next()
  .put(stopLoading())
  .next()
  .isDone();
});

test('start loading effect', () => {
  return expectSaga(initializeSaga)
    .put(startLoading())
    .delay(3000)
    .put(stopLoading())
    .run(false);
});
