import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import styles from './styles';

const TestButton = ({ classes, children, onClick, type, className }) => (
  <Button
    onClick={onClick}
    type={type}
    className={classnames(classes.button, className)}
  >
    {children}
  </Button>
);

TestButton.propTypes = {
  children: PropTypes.node,
  classes: PropTypes.object,
  onClick: PropTypes.func,
  className: PropTypes.string,
  type: PropTypes.string,
};

TestButton.defaultProps = {
  type: 'button',
  onClick: () => {}
};

export default injectSheet(styles)(TestButton);
