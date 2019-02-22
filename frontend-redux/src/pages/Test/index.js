import { connect } from 'react-redux';

// actions creators
import {
  submitValue,
} from 'actionCreators/views/test';
import {
  openTestModal
} from 'actionCreators/modals';

// view
import Test from './Test';

// selector
import testSelector from './selector';

const mapDispatchToProps = {
  submitValue: values => submitValue(values.testField),
  openTestModal,
};

export default connect(
  testSelector,
  mapDispatchToProps,
)(Test);
