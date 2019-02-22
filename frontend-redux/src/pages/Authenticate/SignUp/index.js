import SignUp from './SignUp';
import { reduxForm } from 'redux-form/immutable';

export default reduxForm({
  form: 'signUp'
})(SignUp);
