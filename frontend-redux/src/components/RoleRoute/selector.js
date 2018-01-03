import { createStructuredSelector } from 'reselect';

import { Selectors } from 'domains/user';

export default createStructuredSelector({
  currentUserRole: Selectors.currentUserRole,
});
