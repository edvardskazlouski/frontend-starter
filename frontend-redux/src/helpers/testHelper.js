import React from 'react';
import theme from 'theme';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme } from '@material-ui/core/styles';

const TestComponent = ({ children }) => (
  <MuiThemeProvider theme={createMuiTheme(theme)}>
    {children}
  </MuiThemeProvider>
);

export default TestComponent;
