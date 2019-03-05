import React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@material-ui/core/LinearProgress';
import injectSheet from 'react-jss';
import styles from './styles';

const ProgressLine = ({
  classes,
  progress,
  isActive
}) => {
  if (!isActive) {
    return null;
  }
  return (
    <div className={classes.root}>
      <LinearProgress
        variant="determinate"
        value={progress}
      />
    </div>
  );
};

ProgressLine.propTypes = {
  classes: PropTypes.object.isRequired,
  progress: PropTypes.number.isRequired,
  isActive: PropTypes.bool.isRequired,
};

export default injectSheet(styles)(ProgressLine);
