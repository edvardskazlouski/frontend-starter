import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withTranslation } from 'react-i18next';
import injectSheet from 'react-jss';
import Flag from 'react-world-flags';

import styles from './styles';

@withTranslation()
@injectSheet(styles)
export default class Header extends PureComponent {
  static propTypes = {
    i18n: PropTypes.object.isRequired,
    t: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  };

  handleLanguageChange = (event) => {
    const { i18n } = this.props;
    i18n.changeLanguage(event.nativeEvent.target.value);
  };

  render() {
    const { t, classes, i18n } = this.props;
    const { root, languagesRoot } = classes;

    return (
      <div className={root}>
        <h4>{t('app:headerTitle')}</h4>
        <div className={languagesRoot}>
          <Flag code={i18n.language} height={16}/>
          <select
            name="languages"
            onChange={this.handleLanguageChange}
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
  }
}
