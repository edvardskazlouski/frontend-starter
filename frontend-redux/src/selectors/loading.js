import { createSelector } from 'reselect';

export const loadingState = state => state.get('loading');

export const loadingSelector = createSelector(
  [ loadingState ],
  ( loadingState ) => ({
    blocking: loadingState.get('isLoading')
  })
);
