import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import styles from './styles';

import DialogContent from '@material-ui/core/DialogContent';
import TestButton from 'components/TestButton';

import Typography from '@material-ui/core/Typography';

const TestModal = ({
  classes,
  closeModal,
}) => (
  <div className={classes.root}>
    <Typography className={classes.text} type="headline">Test</Typography>
    <TestButton className={classes.close} onClick={closeModal}>Close Modal</TestButton>
  </div>
);

TestModal.propTypes = {
  classes: PropTypes.object,
  closeModal: PropTypes.func,
};

export default injectSheet(styles)(TestModal);
