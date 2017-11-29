import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';

@translate()
export default class Header extends PureComponent {
  static propTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.props;

    return (
      <div>
        <h4>{t('app:headerTitle')}</h4>
      </div>
    );
  }
}
