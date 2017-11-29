import React, { PureComponent } from 'react';
import { withStyles } from 'material-ui/styles';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { translate } from 'react-i18next';

// commponents
import TestButton from 'components/TestButton';

import styles from './styles';

@translate()
@withStyles(styles)
export default class TestForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  render() {
    const {
      handleSubmit,
      reset,
      classes,
      t,
    } = this.props;

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
