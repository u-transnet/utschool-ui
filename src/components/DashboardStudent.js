import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';
import Header from './Header';
import DashboardStudentContent from './DashboardStudentContent';

const DashboardStudent = ({ match: { params } }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <Header title="Мои лекции"/>
      <DashboardStudentContent />
    </MuiThemeProvider>
  )
}

export default DashboardStudent