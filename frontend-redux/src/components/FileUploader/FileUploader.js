import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { uploadFile } from 'actionCreators/fileUploader';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import classnames from 'classnames';

import styles from './styles';
import UploadFileSelector from './selector';

const mapDispatchToProps = {
  uploadFile,
};

@connect(UploadFileSelector, mapDispatchToProps)
@injectSheet(styles)
export default class UploadFile extends Component {
  static propTypes = {
    uploadFile: PropTypes.func,
    classes: PropTypes.object,
    className: PropTypes.string,
    loading: PropTypes.bool,
    component: PropTypes.object,
    preloader: PropTypes.object,
    multiple: PropTypes.bool,
    files: PropTypes.array,
    onChange: PropTypes.func, // for redux-form
  };

  componentWillUpdate() {
    const { onChange, files } = this.props;
    onChange && onChange(files);
  }

  render() {
    const {
      component,
      preloader,
      classes,
      className,
      loading,
      uploadFile,
      multiple,
      files,
      ...params
    } = this.props;
    const {root, wrapper, inputField, label} = classes;
    return (
      <div className={classnames(root, className)}>
        {loading && (
          <div className={classnames(wrapper)}>
            {React.cloneElement(preloader)}
          </div>
        )}
        <input
          type="file"
          id="fileUploader"
          className={inputField}
          multiple={multiple}
          onChange={event =>
            uploadFile(event.nativeEvent.target.files)
          }
        />
        <label
          htmlFor="fileUploader"
          className={label}
        >
          {React.cloneElement(component, {...params, files})}
        </label>
      </div>
    );
  }
}
