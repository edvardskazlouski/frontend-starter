import SignIn from './SignIn';
import { reduxForm } from 'redux-form/immutable';

export default reduxForm({
  form: 'signIn'
})(SignIn);
