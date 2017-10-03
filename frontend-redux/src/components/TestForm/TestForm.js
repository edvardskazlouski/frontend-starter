import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';

export default class TestForm extends PureComponent {
  static propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    reset: PropTypes.func.isRequired
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { handleSubmit, reset } = this.props;
    const { t } = this.context;

    return (
      <form onSubmit={handleSubmit}>
          <Field
            name="testField"
            component="input"
          />
        <div>
          <button type="submit">{t('app:update')}</button>
          <button type="button" onClick={reset}>{t('app:reset')}</button>
        </div>
      </form>
    );
  }
}
