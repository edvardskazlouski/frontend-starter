import ResetPassword from './ResetPassword';
import { reduxForm } from 'redux-form/immutable';

export default reduxForm({
  form: 'resetPassword'
})(ResetPassword);
