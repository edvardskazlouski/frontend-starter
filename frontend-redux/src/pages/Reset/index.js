import Reset from './Reset';
import { connect } from 'react-redux';

// action creators
import { resetPassword } from 'actionCreators/forms/resetPassword';

const mapDispatchToProps = dispatch => ({
  onSubmitResetPassword: payload => dispatch(resetPassword(payload)),
});

export default connect(() => ({}), mapDispatchToProps)(Reset);
