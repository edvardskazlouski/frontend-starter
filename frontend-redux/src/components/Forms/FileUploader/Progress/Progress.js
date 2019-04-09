import React from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import styles from './styles';

import CircularProgress from '@material-ui/core/CircularProgress';

function Progress({ classes, classNames }) {

  return (
    <div className={
      classnames(
        classes.progressWrapper,
        classNames.progressWrapper
      )
    } >
      <CircularProgress classes={{
        ...classNames,
        circle: classes.circle
      }}/>
    </div>
  );
}

export default injectSheet(styles)(Progress);

Progress.propTypes = {
  classNames: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

Progress.defaultProps = {
  classNames: {},
};
