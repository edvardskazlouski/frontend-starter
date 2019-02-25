import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';
import TextField from '@material-ui/core/TextField';
import Error from 'components/Forms/Error';

const TextInput = ({
  classes,

  input,
  meta,

  placeholder,
  multiline,
  type,
  className,
  errorClassName,
}) => (
  <div className={classnames(className, classes.textInput)}>
    <TextField
      error={!!meta.error}
      multiline={multiline}
      placeholder={placeholder}
      fullWidth
      onChange={event => input.onChange(event.target.value)}
      value={input.value}
      type={type}
    />
    {
      !!meta.touched && !!meta.error &&
        <Error
          className={errorClassName}
          error={meta.error}
        />
    }
  </div>
);

TextInput.propTypes = {
  input: PropTypes.object.isRequired,
  meta: PropTypes.object.isRequired,

  multiline: PropTypes.bool,
  placeholder: PropTypes.string,
  className: PropTypes.string,
  classNameInput: PropTypes.string,
  errorClassName: PropTypes.string,
  type: PropTypes.string,
};

TextInput.defaultProps = {
  multiline: false,
  placeholder: '',
  className: '',
  errorClassName: '',
  type: 'text',
};

export default injectSheet(styles)(TextInput);
