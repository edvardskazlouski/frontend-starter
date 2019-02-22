import { connect } from 'react-redux';

import {
  registerUploader,
  deregisterUploader,
  uploadFiles,
} from 'actionCreators/fileUploader';

import ImageUploader from './FileUploader';
import selector from './selector';

const mapDispatchToProps = {
  registerUploader,
  deregisterUploader,
  uploadFiles,
};

export default connect(selector, mapDispatchToProps)(ImageUploader);
