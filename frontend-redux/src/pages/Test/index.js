import { connect } from 'react-redux';

// actions creators
import * as TestViewActionCreators from '../../actionCreators/views/test';
import { openTestModal } from '../../actionCreators/modals';

// view
import Test from './Test';

// selector
import testSelector from './selector';

export default connect(
  testSelector,
  dispatch => ({
    submitValue: values => dispatch(TestViewActionCreators.submitValue(values.testField)),
    openTestModal: () => dispatch(openTestModal())
  }),
)(Test);
