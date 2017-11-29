import React from 'react';
import { configure, addDecorator } from '@storybook/react';

// decorators
import { I18nextProvider } from 'react-i18next';
import { ThemeProvider } from 'react-jss';
import { MuiThemeProvider } from 'material-ui/styles';

import theme from '../src/theme';
import i18n from '../src/config/i18next'; // initialized i18next instance

addDecorator(story =>
  <I18nextProvider i18n={i18n}>
    <MuiThemeProvider theme={theme}>
      <ThemeProvider theme={theme}>
        {story()}
      </ThemeProvider>
    </MuiThemeProvider>
  </I18nextProvider>
);  // add correct context for react router components


function loadStories() {
  require('../src/stories');
}

configure(loadStories, module);
