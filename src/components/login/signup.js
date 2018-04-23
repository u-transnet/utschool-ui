// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
//
import history from '../../history';
import SignUpForm from './signUpForm';
//
import './login.css';

type Props = {
  toggleForm: Function,
  backToLogin: Function,
  formFlag: boolean
};
type State = {};

class SignUp extends React.Component<Props, State> {
  render() {
    return (
      <div className="login-wrap">
        <IconButton className="back-button" color="inherit" href="/">
          <i className="material-icons">arrow_back</i>
        </IconButton>
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
                UT-SCHOOL
              </Typography>
            </Grid>
            <SignUpForm />
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
