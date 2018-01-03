import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

import styles from './styles';

import { DialogContent } from 'material-ui/Dialog';
import TestButton from 'components/TestButton';

import Typography from 'material-ui/Typography';

class TestModal extends Component {
  render() {
    const { classes, closeModal, data } = this.props;

    return (
      <DialogContent className={classes.content}>
        <Typography className={classes.text} type="headline">{data.get('headline')}</Typography>
        <TestButton className={classes.close} onClick={closeModal}>Close Modal</TestButton>
      </DialogContent>
    );
  }
}

TestModal.propTypes = {
  classes: PropTypes.object,
  closeModal: PropTypes.func,
};

export default injectSheet(styles)(TestModal);
