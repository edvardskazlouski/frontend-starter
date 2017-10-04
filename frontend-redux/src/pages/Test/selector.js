import { createSelector } from 'reselect';

// domains
import { Selectors as TestGroupsSelectors } from '../../domains/testGroups';

// view
import * as TestViewSelectors from '../../selectors/views/test';

export default createSelector(
  TestGroupsSelectors.groups,
  TestViewSelectors.isOk,
  TestViewSelectors.submittedValue,
  (groups, isOk, submittedValue) => ({
    groups, isOk, submittedValue
  })
);
