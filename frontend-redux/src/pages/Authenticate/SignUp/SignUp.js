import React from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import injectSheet from 'react-jss';
import styles from './styles';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import { withTranslation } from 'react-i18next';

import TextInput from 'components/Forms/TextInput';
import PasswordInput from 'components/Forms/PasswordInput';
import Button from '@material-ui/core/Button';

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
      />
    </FormControl>
    <FormControl className={classes.formControl}>
      <Typography className={classes.heading}>
        {t('auth:password')}
      </Typography>
      <Field
        name="password"
        component={PasswordInput}
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

export default withTranslation()(
  injectSheet(styles)(SignUp)
);
