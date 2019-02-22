import { createSelector } from 'reselect';

export const testState = state => state.get('test');

export const isOk = createSelector(
  testState,
  testState => testState.get('isOk')
);

export const submittedValue = createSelector(
  testState,
  testState => testState.get('submittedValue')
);
