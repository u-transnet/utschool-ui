// @flow

import * as React from 'react';
//
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
//
import LoginForm from './loginForm';
import LoginResults from './loginResults';
//
import './Login.css';

type Props = {};

export default class Login extends React.Component<Props> {
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
              UT-SCHOOL
            </Typography>
          </Grid>
          <LoginForm onSubmit={LoginResults} />
        </Grid>
      </div>
    );
  }
}
