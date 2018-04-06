// @flow

import React from 'react';
// import { connect } from 'react-redux';
// import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
// import { FormControlLabel } from 'material-ui/Form';
// import Checkbox from 'material-ui/Checkbox';
// import Button from 'material-ui/Button';
// import Input, { InputLabel } from 'material-ui/Input';
// import { FormControl, FormHelperText } from 'material-ui/Form';
// import { setUserName } from '../../actions/actionsUser';
import SignUpForm from './signUpForm';

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
          <SignUpForm />
        </Grid>
      </div>
    );
  }
}

// function mapStateToProps(state) {
//   return {
//     userName: state.user.userName
//   };
// }

// const mapDispatchToProps = dispatch => ({
//   onSetUserName(event) {
//     dispatch(setUserName(event.target.value));
//   }
// });

// export default withStyles(styles)(
//   connect(mapStateToProps, mapDispatchToProps)(Login)
// );
