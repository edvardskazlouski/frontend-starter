import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import { compose, pure } from 'recompose';
import classnames from 'classnames';

import BlockUi from 'react-block-ui';
import 'react-block-ui/style.css';

import styles from './styles';

const Loading = ({ classes, className, children, blocking, renderChildren }) => (
  <BlockUi
    className={classnames(classes.loader, className)}
    tag="div"
    renderChildren={renderChildren}
    blocking={blocking}
  >
    {children}
  </BlockUi>
);

Loading.propTypes = {
  classes: PropTypes.object.isRequired,
  children: PropTypes.node,

  blocking: PropTypes.bool.isRequired,
  renderChildren: PropTypes.bool
};

Loading.defaultProps = {
  renderChildren: false,
  children: null,
};

export default compose(
  injectSheet(styles),
  pure
)(
  Loading
);
