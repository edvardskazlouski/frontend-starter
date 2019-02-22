import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import ResetPassword from './ResetPassword';
import styles from './styles';

const Reset = ({ classes, onSubmitResetPassword }) => (
  <div className={classes.root}>
    <ResetPassword
      onSubmit={payload => onSubmitResetPassword(payload)}
    />
  </div>
);

Reset.propTypes = {
  onSubmitResetPassword: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet(styles)(Reset);
