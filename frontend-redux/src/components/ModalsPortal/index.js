import { connect } from 'react-redux';

// actions creators
import * as ModalsActionCreators from '../../actionCreators/modals';

import ModalsPortal from './ModalPortals';
import mapStateToProps from './selector';

export default connect(
  mapStateToProps,
  dispatch => ({
    closeModal: values => dispatch(ModalsActionCreators.closeModal())
  })
)(ModalsPortal);
