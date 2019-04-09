import React, { Component } from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import SwipeableViews from 'react-swipeable-views';
import { withTranslation } from 'react-i18next';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import styles from './styles';

import SignIn from './SignIn';
import SignUp from './SignUp';

@withTranslation()
@injectSheet(styles)
export default class Authenticate extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    openForgotPasswordModal: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 0,
    };
  }

  setSelectedTab = selectedTab => this.setState({ selectedTab });

  render() {
    const { classes, openForgotPasswordModal, t } = this.props;

    return (
      <div className={classes.root}>
        <AppBar
          color="default"
          position="static"
          className={classes.appBar}
        >
          <Tabs
            value={this.state.selectedTab}
            onChange={(event, selectedTab) => this.setSelectedTab(selectedTab)}
            classes={{
              root: classes.tabs,
            }}
            variant='fullWidth'
          >
            <Tab
              className={classes.tab}
              label={t('auth:signIn')}
            />
            <Tab
              className={classes.tab}
              label={t('auth:signUp')}
            />
          </Tabs>
        </AppBar>
        <SwipeableViews
          index={this.state.selectedTab}
          onChangeIndex={this.setSelectedTab}
          className={classes.swipeableViews}
        >
          <SignIn
            onSubmit={values => console.log(values)}
            openForgotPasswordModal={openForgotPasswordModal}
          />
          <SignUp
            onSubmit={values => console.log(values)}
          />
        </SwipeableViews>
      </div>
    );
  }
}
