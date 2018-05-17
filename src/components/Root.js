// @flow

import * as React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
//
import history from '../history';
import Login from './login/login';
import SignUp from './login/signup';
import Dashboard from './dashboard/dashboard';
import ClassDashboard from './teacher/classDashboard';
import Profile from './Profile';
import Settings from './Settings';
import Help from './Help';
import theme from '../stores/theme';

type Props = {
  store: any
};

export default class Root extends React.Component<Props> {
  render() {
    return (
      <Provider store={this.props.store}>
        <MuiThemeProvider theme={theme}>
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/sign-up" component={SignUp} />
              <Route exact path="/dashboard" component={Dashboard} />
              <Route exact path="/class" component={ClassDashboard} />
              <Route exact path="/profile" component={Profile} />
              <Route exact path="/settings" component={Settings} />
              <Route exact path="/help" component={Help} />
            </Switch>
          </Router>
        </MuiThemeProvider>
      </Provider>
    );
  }
}
