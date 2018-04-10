import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';
import Header from './header';

const Profile = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <p>Профиль</p>
    </MuiThemeProvider>
  );
};

export default Profile;
