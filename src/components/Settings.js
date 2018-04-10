import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';
import Header from './header';

const Settings = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <p>Настройки</p>
    </MuiThemeProvider>
  );
};

export default Settings;
