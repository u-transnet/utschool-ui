// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Provider } from 'react-redux';
import { Router, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Api from 'utschool-js';
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
import { setApiInit } from '../actions';

type Props = {
  store: any,
  account: string,
  onSetApiInit: Function
};

class Root extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    if (document.readyState) {
      let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
      let accountName = this.props.account;
      let privateKey = null;
      Api.init(nodeUrl, accountName, privateKey).then(api => {
        // save init api to store
        this.props.onSetApiInit(api);
      });
    }
  }
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

function mapStateToProps(state) {
  return {
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({
  onSetApiInit(val) {
    dispatch(setApiInit(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Root);
