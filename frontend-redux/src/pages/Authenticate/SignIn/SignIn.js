import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';

import TextInput from 'components/Forms/TextInput';
import PasswordInput from 'components/Forms/PasswordInput';
import Button from 'material-ui/Button';

const SignIn = ({ handleSubmit, classes, openForgotPasswordModal }, { t }) => (
  <form
    className={classes.login}
    onSubmit={handleSubmit}
  >
    <FormControl className={classes.formControl}>
      <Typography className={classes.heading}>
        {t('auth:email')}
      </Typography>
      <Field
        name="email"
        inputClassName={classes.input}
        component={TextInput}
        props={{
          type: 'email'
        }}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <Typography className={classes.heading}>
        {t('auth:password')}
      </Typography>
      <Field
        name="password"
        inputClassName={classes.input}
        component={PasswordInput}
      />
      <div
        className={classes.forgotPassword}
        onClick={openForgotPasswordModal}
      >
        {t('auth:forgotPassword')}
      </div>
    </FormControl>
    <Button
      type="submit"
      className={classes.submitButton}
    >
      {t('auth:signIn')}
    </Button>
  </form>
);

SignIn.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  openForgotPasswordModal: PropTypes.func.isRequired,
};

SignIn.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default withStyles(styles)(SignIn);
