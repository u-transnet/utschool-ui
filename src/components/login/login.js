// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
//
import { toggleForm } from '../../actions/loginAction';
import LoginForm from './loginForm';
import SignUpForm from './signUpForm';
//
import './login.css';

type Props = {
  toggleForm: Function,
  backToLogin: Function,
  title: string,
  formFlag: boolean
};
type State = {};

class Login extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    const { backToLogin } = this.props;
    const back = () => backToLogin(this.props.formFlag);
    return (
      <div className="login-wrap">
        {this.props.formFlag ? (
          <IconButton className="back-button" color="inherit" onClick={back}>
            <i className="material-icons">arrow_back</i>
          </IconButton>
        ) : (
          ''
        )}
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

const mapDispatchToProps = dispatch => ({
  backToLogin(val) {
    dispatch(toggleForm(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
