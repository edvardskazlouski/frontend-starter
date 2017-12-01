import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

import styles from './styles';

import Dialog from 'material-ui/Dialog';

class BaseModal extends Component {
  render() {
    const { classes, isOpen, children, closeAction } = this.props;

    return (
      <Dialog classes={classes} className={classes.modal} open={isOpen} onRequestClose={closeAction}>
        {
          React.Children.map(children,
            (child) => React.cloneElement(child, {
              closeModal: closeAction
            })
          )
        }
      </Dialog>
    );
  }
}

BaseModal.defaultProps = {
  isOpen: true,
};

BaseModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  classes: PropTypes.object,
  children: PropTypes.node,
  closeAction: PropTypes.func,
};


export default withStyles(styles)(BaseModal);