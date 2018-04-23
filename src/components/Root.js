import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import Login from './login/login';
import SignUp from './login/signup';
import Dashboard from './dashboard/dashboard';

import TeacherClassApplicants from './TeacherClassApplicants';
import Profile from './Profile';
import Settings from './Settings';
import Help from './Help';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import theme from '../stores/theme';

const Root = ({ store }) => (
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/dashboard" component={Dashboard} />
          <Route
            exact
            path="/teacher-class-applicants/:id/:accepted"
            component={TeacherClassApplicants}
          />
          <Route exact path="/profile" component={Profile} />
          <Route exact path="/settings" component={Settings} />
          <Route exact path="/help" component={Help} />
        </Switch>
      </Router>
    </MuiThemeProvider>
  </Provider>
);

Root.propTypes = {
  store: PropTypes.object.isRequired
};
export default Root;
