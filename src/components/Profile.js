import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';
import Header from './header/header';

const Profile = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <p className="empty-block">Профиль</p>
    </MuiThemeProvider>
  );
};

export default Profile;
