import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import styles from './styles';
import classnames from 'classnames';
import Typography from '@material-ui/core/Typography';

const Error = ({ classes, error, className }) => (
  <Typography
    type="body2"
    classes={{ body2: classnames(className, classes.errorText) }}
  >
    {error}
  </Typography>
);

Error.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
};

export default injectSheet(styles)(Error);
