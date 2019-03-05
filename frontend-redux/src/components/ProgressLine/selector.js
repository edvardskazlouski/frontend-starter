import { createStructuredSelector } from 'reselect';

import { progress, isActive } from 'domains/http/selectors';

export default createStructuredSelector({
  progress,
  isActive,
});
