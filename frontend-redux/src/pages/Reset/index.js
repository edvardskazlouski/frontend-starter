import Reset from './Reset';
import { connect } from 'react-redux';

// action creators
import { resetPassword } from 'actionCreators/forms/resetPassword';

const mapDispatchToProps = {
  onSubmitResetPassword: resetPassword,
};

export default connect(
  null,
  mapDispatchToProps,
)(Reset);
