import { createSelector } from 'reselect';

export const testGroupsState = state => state.get('testGroups');

export const groups = createSelector(
  testGroupsState,
  testGroups => testGroups.get('groups')
);
