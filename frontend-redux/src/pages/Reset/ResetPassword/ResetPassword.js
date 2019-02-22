import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import injectSheet from 'react-jss';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { withTranslation } from 'react-i18next';

import PasswordInput from 'components/Forms/PasswordInput';
import Button from '@material-ui/core/Button';

const ResetPassword = ({ handleSubmit, classes, openForgotPasswordModal, t }) => (
  <form
    className={classes.reset}
    onSubmit={handleSubmit}
  >
    <Typography className={classes.title}>
      {t('reset:resetPassword')}
    </Typography>
    <Typography className={classes.info}>
      {t('reset:resetTime')}
    </Typography>
    <FormControl className={classes.formControl}>
      <Field
        name="password"
        component={PasswordInput}
      />
    </FormControl>
    <Button
      type="submit"
      className={classes.submitButton}
    >
      {t('reset:confirm')}
    </Button>
  </form>
);

ResetPassword.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default withTranslation()(
  injectSheet(styles)(ResetPassword)
);
