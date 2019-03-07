import { createStructuredSelector } from 'reselect';

import { requestsSize, averageProgress } from 'domains/http/selectors';

export default createStructuredSelector({
  requestsSize,
  averageProgress,
});
