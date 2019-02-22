import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import ImPropTypes from 'react-immutable-proptypes';
import PropTypes from 'prop-types';

import styles from './styles';

import Uploader from './Uploader';
import Progress from './Progress';

@injectSheet(styles)
export default class FileUploader extends PureComponent {
  static propTypes = {
    files: ImPropTypes.list,
    error: ImPropTypes.map,

    input: PropTypes.object.isRequired,
    fileTypes: PropTypes.string,
    isLoading: PropTypes.bool,

    registerUploader: PropTypes.func.isRequired,
    deregisterUploader: PropTypes.func.isRequired,
    uploadFiles: PropTypes.func.isRequired,

    className: PropTypes.string,
    classes: PropTypes.object.isRequired,

    renderComponent: PropTypes.any,
    preloaderComponent: PropTypes.any,
  };

  static defaultProps = {
    isLoading: false,
    fileTypes: '',
  };

  componentWillMount = () => {
    const { registerUploader, input, meta } = this.props;
    registerUploader({
      form: meta.form,
      name: input.name,
    });
  };

  componentWillUnmount = () => {
    const { deregisterUploader, input, meta } = this.props;
    deregisterUploader({
      form: meta.form,
      name: input.name,
    });
  };

  componentWillReceiveProps = (props) => {
    const { input } = this.props;
    input.onChange(props.files);
  };

  handleFileLoading = (files) => {
    const { uploadFiles, input, meta } = this.props;
    uploadFiles({
      form: meta.form,
      name: input.name,
      files,
    });
  };

  render() {
    const {
      classes,
      isLoading,
      input,
      fileTypes,
      className,
      renderComponent,
      preloaderComponent,
      error,
    } = this.props;
    const Component = renderComponent;
    const Preloader = preloaderComponent || Progress;

    return (
      <Uploader
        name={input.name}
        isLoading={isLoading}
        files={input.value}
        className={className}
        onFilesLoading={this.handleFileLoading}
        component={Component}
        preloader={Preloader}
        fileTypes={fileTypes}
      />
    );
  }
}
