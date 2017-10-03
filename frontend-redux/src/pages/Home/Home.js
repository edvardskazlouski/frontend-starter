import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import injectSheet from 'react-jss';

import styles from './styles';

class Home extends PureComponent {
  static propTypes = {
    route: PropTypes.string.isRequired
  };

  static contextTypes = {
    t: PropTypes.func.isRequired,
  };

  render() {
    const { t } = this.context;
    const {
      route,
      classes
    } = this.props;

    return (
      <div>
        <ReactHelmet
          title="Home screen"
        />
        <div className={classes.title}>
          {t('home:homeTitle')}
        </div>
        {route}
      </div>
    );
  }
}

export default injectSheet(styles)(Home);
