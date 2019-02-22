import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import injectSheet from 'react-jss';
import styles from './styles';
import Error from 'components/Forms/Error';

import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

class PasswordInput extends Component {
  static propTypes = {
    input: PropTypes.object.isRequired,
    meta: PropTypes.object.isRequired,

    className: PropTypes.string,
    inputClassName: PropTypes.string,
    errorClassName: PropTypes.string,
  };

  static defaultProps = {
    inputClassName: '',
    className: '',
    errorClassName: '',
  };

  constructor() {
    super();

    this.state = {
      show: false,
    };
  }

  toggleVisibility = () => this.setState({ show: !this.state.show });

  render() {
    const {
      classes,
      input,
      meta,

      className,
      inputClassName,
      errorClassName,
    } = this.props;

    return (
      <div className={classnames(className, classes.passwordInput)}>
        <Input
          error={!!meta.error}
          className={inputClassName}
          type={this.state.show ? 'text' : 'password'}
          value={input.value}
          onChange={event => input.onChange(event.target.value)}
          classes={{
            formControl: classes.formControl,
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                className={classes.iconButton}
                onClick={this.toggleVisibility}
                onMouseDown={event => event.preventDefault()}
              >
                {this.state.show ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        {
          !!meta.error &&
          <Error
            className={errorClassName}
            error={meta.error}
          />
        }
      </div>
    );
  }
}

export default injectSheet(styles)(PasswordInput);
