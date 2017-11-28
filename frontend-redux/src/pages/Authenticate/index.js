import Authenticate from './Authenticate';
import { connect } from 'react-redux';

// action creators
import { openForgotPasswordModal } from 'actionCreators/modals';

const mapDispatchToProps = dispatch => ({
  openForgotPasswordModal: () => dispatch(openForgotPasswordModal()),
});

export default connect(() => ({}), mapDispatchToProps)(Authenticate);
