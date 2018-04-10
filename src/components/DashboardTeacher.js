import React from 'react';
import Header from './header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';

import DashboardTeacherContent from './DashboardTeacherContent';

const DashboardTeacher = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header />
      <DashboardTeacherContent />
    </MuiThemeProvider>
  );
};

export default DashboardTeacher;
