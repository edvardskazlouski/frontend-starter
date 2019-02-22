import React from 'react';
import injectSheet from 'react-jss';
import classnames from 'classnames';
// import ImPropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './styles';

function Uploader({
  component,
  preloader,
  render,

  classes,
  className,

  multiple,
  fileTypes,

  isLoading,
  files,
  name,
  onFilesLoading,

  ...params
}) {
  const uploaderId = `fileUploader:${name}`;

  return (
    <div className={classnames(classes.root, className)}>
      <input
        type="file"
        id={uploaderId}
        className={classes.inputField}
        multiple={multiple}
        accept={fileTypes}
        onChange={event =>
          onFilesLoading(
            event.target.files,
          )
        }
      />
      <label
        htmlFor={uploaderId}
        className={classes.label}
      >
        {React.createElement(component, { ...params, files })}
      </label>
      {isLoading && (
        <div className={classes.wrapper}>
          {React.createElement(preloader)}
        </div>
      )}
    </div>
  );
}

export default injectSheet(styles)(Uploader);

Uploader.defaultProps = {
  multiple: false,
  isLoading: false,
  files: [],
};

Uploader.propTypes = {
  // component: PropTypes.element,
  // preloader: PropTypes.element,
  // render: PropTypes.node,

  classes: PropTypes.object.isRequired,
  className: PropTypes.string,

  multiple: PropTypes.bool,
  fileTypes: PropTypes.string,

  isLoading: PropTypes.bool,
  name: PropTypes.string.isRequired,
  // files: ImPropTypes.list,
  onFilesLoading: PropTypes.func,
};
