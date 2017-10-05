import TestForm from './TestForm';
import { reduxForm } from 'redux-form/immutable';

export default reduxForm({
  form: 'testForm',
})(TestForm);
