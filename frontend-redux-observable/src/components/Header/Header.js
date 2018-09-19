import React from 'react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import injectSheet from 'react-jss';
import { compose, pure } from 'recompose';

import styles from './styles';

const Header = ({ i18n, t, classes }) => (
  <div className={classes.header}>
    <h4>{t('app:headerTitle')}</h4>
    <div className={classes.languagesRoot}>
      <select
        name="languages"
        onChange={e => i18n.changeLanguage(e.nativeEvent.target.value)}
      >
        {i18n.languages.map(lng => (
          <option
            value={lng}
            key={lng}
          >
            {lng}
          </option>
        ))}
      </select>
    </div>
  </div>
);

Header.propTypes = {
  i18n: PropTypes.object.isRequired,
  t: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
};

export default compose(
  translate(),
  injectSheet(styles),
  pure,
)(Header);
