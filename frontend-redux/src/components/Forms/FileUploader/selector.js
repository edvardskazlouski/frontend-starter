import { createStructuredSelector } from 'reselect';

import { isLoading, files, error } from 'selectors/fileUploader';

export default createStructuredSelector({
  isLoading,
  files,
  error,
});
