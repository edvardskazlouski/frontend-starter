import { connect } from 'react-redux';

// actions creators
import {
  submitValue,
} from 'actionCreators/views/test';
import {
  openTestModal
} from 'actionCreators/modals';

import {
  initiateRequest
} from 'actionCreators/views/test';

import {
  cancelRequest
} from 'actionCreators/views/test';
// view
import Test from './Test';

// selector
import testSelector from './selector';

const mapDispatchToProps = {
  submitValue: values => submitValue(values.testField),
  openTestModal,
  initiateRequest,
  cancelRequest
};

export default connect(
  testSelector,
  mapDispatchToProps,
)(Test);
