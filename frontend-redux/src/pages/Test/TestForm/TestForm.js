import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

// commponents
import TestButton from 'components/TestButton';

import styles from './styles';

class TestForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const {
      handleSubmit,
      reset,
      classes
    } = this.props;
    const { t } = this.context;

    return (
      <form onSubmit={handleSubmit}>
          <Field
            name="testField"
            component="input"
          />
        <div>
          <TestButton
            type="submit"
            className={classes.submit}
          >
            {t('app:update')}
          </TestButton>
          <button type="button" onClick={reset}>{t('app:reset')}</button>
        </div>
      </form>
    );
  }
}

export default injectSheet(styles)(TestForm);
