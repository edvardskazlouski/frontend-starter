import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { withStyles } from 'material-ui/styles';
import styles from './styles';
import Typography from 'material-ui/Typography';
import { FormControl } from 'material-ui/Form';
import { translate } from 'react-i18next';

import TextInput from 'components/Forms/TextInput';
import PasswordInput from 'components/Forms/PasswordInput';
import Button from 'material-ui/Button';

const SignUp = ({ handleSubmit, classes, t }) => (
  <form
    className={classes.signUp}
    onSubmit={handleSubmit}
  >
    <FormControl className={classes.formControl}>
      <Typography className={classes.heading}>
        {t('auth:email')}
      </Typography>
      <Field
        name="email"
        component={TextInput}
        inputClassName={classes.input}
        props={{
          type: 'email'
        }}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <Typography className={classes.heading}>
        {t('auth:signUpCode')}
      </Typography>
      <Field
        name="code"
        component={TextInput}
        inputClassName={classes.input}
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <Typography className={classes.heading}>
        {t('auth:password')}
      </Typography>
      <Field
        name="password"
        component={PasswordInput}
        inputClassName={classes.input}
      />
    </FormControl>
    <Button
      type="submit"
      className={classes.submitButton}
    >
      {t('auth:signUp')}
    </Button>
  </form>
);

SignUp.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
};

export default translate()(
  withStyles(styles)(SignUp)
);
