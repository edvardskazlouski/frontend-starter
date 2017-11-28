import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import { connect } from 'react-redux';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import { loadingSelector } from 'selectors/loading';

import styles from './styles';

const Loading = ({ classes, children, blocking, renderChildren }) => (
  <BlockUi
    className={classes.loader}
    tag="div"
    renderChildren={renderChildren}
    blocking={blocking}
  >
    {children}
  </BlockUi>
);

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,

  blocking: PropTypes.bool.isRequired,
  renderChildren: PropTypes.bool
};

Loading.defaultProps = {
  renderChildren: false,
};

export default connect(loadingSelector)(
  withStyles(styles)(Loading)
);
