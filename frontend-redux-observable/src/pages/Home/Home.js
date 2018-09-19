import React from 'react';
import PropTypes from 'prop-types';
import ReactHelmet from 'react-helmet';
import injectSheet from 'react-jss';
import { compose, pure } from 'recompose';
import { translate } from 'react-i18next';

import styles from './styles';

const Home = ({ t, classes, route, openTestModal }) => (
  <div>
    <ReactHelmet
      title="Home screen"
    />
    <div className={classes.title}>
      {t('home:homeTitle')}
    </div>
    {route}
    <button onClick={openTestModal}>
      Open modal
    </button>
  </div>
);

Home.propTypes = {
  classes: PropTypes.object.isRequired,
  route: PropTypes.string.isRequired,
  t: PropTypes.func.isRequired,
};

export default compose(
  translate(),
  injectSheet(styles),
  pure,
)(Home);
