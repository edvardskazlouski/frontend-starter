import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import injectSheet from 'react-jss';

import { withTranslation } from 'react-i18next';

import styles from './styles';

@withTranslation()
@injectSheet(styles)
export default class Home extends PureComponent {
  static propTypes = {
    route: PropTypes.string.isRequired,
    t: PropTypes.func.isRequired,
  };

  onClick = () => {
    this.props.history.push('/test');
  };

  render() {
    const {
      route,
      classes,
      t,
    } = this.props;

    return (
      <div>
        <ReactHelmet
          title="Home screen"
        />
        <div className={classes.title}>
          {t('home:homeTitle')}
          <button onClick={this.onClick}>TestPage</button>
        </div>
        {route}
      </div>
    );
  }
}
