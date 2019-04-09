import React, { PureComponent } from 'react';
import injectSheet from 'react-jss';
import PropTypes from 'prop-types';
import { Field } from 'redux-form/immutable';
import { withTranslation } from 'react-i18next';

// commponents
import TestButton from 'components/TestButton';
import FileUploader from 'components/Forms/FileUploader';

import styles from './styles';

@withTranslation()
@injectSheet(styles)
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
    const Component = () => (
      <div style={{ height: 100, backgroundColor: 'red', width: 100 }}>
        uploader
      </div>
    );

    return (
      <form onSubmit={handleSubmit}>
        <Field
          name="testField"
          component="input"
        />
        <Field
          component={FileUploader}
          renderComponent={Component}
          name="image"
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
