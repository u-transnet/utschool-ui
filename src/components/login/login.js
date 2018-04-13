// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
//
import LoginForm from './loginForm';
import SignUpForm from './signUpForm';
//
import './login.css';

type Props = {
  title: string
};
type State = {};

class Login extends React.Component<Props, State> {
  render() {
    return (
      <div className="login-box">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <i className="icon icon-logo login-avatar" />
          </Grid>
          <Grid item xs={12}>
            <Typography
              variant="headline"
              component="h1"
              className="login-title"
            >
              {this.props.title}
            </Typography>
          </Grid>
          {!this.props.formFlag ? <LoginForm /> : <SignUpForm />}
        </Grid>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    formFlag: state.login.formFlag,
    title: state.app.title
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
