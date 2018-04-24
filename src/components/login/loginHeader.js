// @flow
import * as React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
//
import './login';

type Props = {};
type State = {};

export default class LoginHeader extends React.Component<Props, State> {
  render() {
    return (
      <div className="header-wrap">
        <Grid item xs={12}>
          <i className="icon icon-logo login-avatar" />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="headline" component="h1" className="login-title">
            UT-SCHOOL
          </Typography>
        </Grid>
      </div>
    );
  }
}
