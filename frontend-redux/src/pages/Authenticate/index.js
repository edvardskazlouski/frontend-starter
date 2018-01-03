import Authenticate from './Authenticate';
import { connect } from 'react-redux';

// action creators
import { openForgotPasswordModal } from 'actionCreators/modals';

const mapDispatchToProps = {
  openForgotPasswordModal,
};

export default connect(
  null,
  mapDispatchToProps
)(Authenticate);
