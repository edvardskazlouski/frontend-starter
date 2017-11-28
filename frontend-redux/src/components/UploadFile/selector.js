import { createStructuredSelector } from 'reselect';

import { loading } from 'selectors/uploadFiles';

export default createStructuredSelector({
  loading,
});
