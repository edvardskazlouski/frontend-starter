import React from 'react';
import PropTypes from 'prop-types';
import { uploadFile } from 'actionCreators/uploadFiles';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import styles from './styles';
import UploadFileSelector from './selector';

function UploadFile({
  component,
  preloader,
  classes,
  className,
  loading,
  ...params
}) {
  const { root, wrapper, hidden } = classes;
  return (
    <div className={classnames(root, className)}>
      {React.createElement(component, params)}
      <div className={classnames(wrapper, loading || hidden)}>
        {preloader}
      </div>
    </div>
  );
}

UploadFile.propTypes = {
  uploadFile: PropTypes.func,
  classes: PropTypes.object,
  className: PropTypes.string,
  loading: PropTypes.bool,
};

const mapDispatchToProps = {
  uploadFile,
};

export default connect(UploadFileSelector, mapDispatchToProps)(
  injectSheet(styles)(UploadFile)
);
