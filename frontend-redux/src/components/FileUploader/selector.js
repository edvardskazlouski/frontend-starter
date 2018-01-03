import { createStructuredSelector } from 'reselect';

import { loading, files } from 'selectors/fileUploader';

export default createStructuredSelector({
  loading,
  files,
});
