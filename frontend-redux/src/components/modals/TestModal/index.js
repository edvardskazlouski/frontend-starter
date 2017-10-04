import { connect } from 'react-redux';

// actions creators
import * as ModalsActionCreators from '../../../actionCreators/modals';

import TestModal from './TestModal';

export default connect(
  null,
  dispatch => ({
    closeModal: values => dispatch(ModalsActionCreators.closeModal())
  })
)(TestModal);
