import React from 'react';
import Header from './Header';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';

import TeacherClassApplicantsContent from './TeacherClassApplicantsContent';


const DashboardTeacher = ({ match: { params } }) => {
    return (
        <MuiThemeProvider theme={theme}>
            <Header />
            <TeacherClassApplicantsContent />
        </MuiThemeProvider>
    )
}

export default DashboardTeacher