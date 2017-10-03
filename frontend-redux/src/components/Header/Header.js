import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Header extends PureComponent {
  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.context;

    return (
      <div>
        <h4>{t('app:headerTitle')}</h4>
      </div>
    );
  }
}

export default Header;
