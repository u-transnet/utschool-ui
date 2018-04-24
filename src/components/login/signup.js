// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
//
import renderAccountField from './accountField';
import renderPasswordField from './passwordField';
import renderRememberCheckbox from './rememberCheckbox';
//
import putUserFaucetApi from '../api/putUserFaucetApi';
import getUserFaucetApi from '../api/getUserFaucetApi';
import lecturesBTSApi from '../api/lecturesBTSApi';
//
import vkAuthorization from '../authorization/vkAuthorization';
//
import { setAccountName } from '../../actions/actionsUser';
import { setLectures } from '../../actions/lecturesAction';
import validate from './validate';
import LoginHeader from './loginHeader';
import history from '../../history';
//
import './login.css';

type Props = {
  handleSubmit: Function,
  setAccount: Function,
  onSetLectures: Function
};
type State = {};

class SignUp extends React.Component<Props, State> {
  componentDidMount() {
    //get vk token
    let url = window.location.href;
    let hashData = new URL(url).hash;
    if (hashData) {
      let token = hashData
        .split('&')
        .filter(function(el) {
          return el.match('access_token') !== null ? true : false;
        })[0]
        .split('=')[1];

      console.log(token);
    }
  }
  render() {
    const { handleSubmit, setAccount, onSetLectures } = this.props; // No fields prop
    let signupSubmit = (values: any) => {
      let userFaucetData = getUserFaucetApi(values.newaccount);
      let lecturesBTSData = lecturesBTSApi(values.newaccount);
      let putUserFaucetData = putUserFaucetApi(
        values.newaccount,
        values.password,
        'vk'
      );
      return userFaucetData.then(data => {
        let flag = false;
        data ? (flag = true) : (flag = false);
        let passValid = values.password
          ? values.password.match(
              /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
            )
          : false;
        if (flag) {
          throw new SubmissionError({
            newaccount: 'Такая запись уже существует.',
            _error: 'SignUp failed!'
          });
        } else if (!passValid) {
          throw new SubmissionError({
            password:
              '8 символов минимум (цыфры, большие и маленькие буквы, символы).',
            _error: 'SignUp failed!'
          });
        } else {
          // lecturesBTSData.then(resp => {
          //   onSetLectures(resp);
          // });
          putUserFaucetData.then(data => {
            setAccount(values.newaccount);
          });
        }
      });
    };

    return (
      <div className="login-wrap">
        <IconButton
          className="back-button"
          color="inherit"
          component={Link}
          to="/"
        >
          <i className="material-icons">arrow_back</i>
        </IconButton>
        <div className="login-box">
          <Grid container spacing={0}>
            <LoginHeader />
            <form onSubmit={handleSubmit(signupSubmit)}>
              <Grid item xs={12}>
                <Field
                  name="newaccount"
                  className="login-field"
                  component={renderAccountField}
                />
              </Grid>
              <Grid item xs={12}>
                <Field
                  name="password"
                  className="login-field"
                  component={renderPasswordField}
                />
              </Grid>
              <Grid item xs={12}>
                <div className="check-el">
                  <Field name="rememberMe" component={renderRememberCheckbox} />
                </div>
              </Grid>
              <Grid item xs={12}>
                <Button
                  ariant="raised"
                  size="medium"
                  color="primary"
                  onClick={vkAuthorization}
                  className="login-button"
                >
                  Войти ВКонтакте
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="raised"
                  size="medium"
                  color="primary"
                  className="login-button"
                >
                  Создать акаунт
                </Button>
              </Grid>
            </form>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

const mapDispatchToProps = dispatch => ({
  setAccount(val) {
    dispatch(setAccountName(val));
    history.push('/dashboard');
  },
  onSetLectures(val) {
    dispatch(setLectures(val));
  }
});

const SignUpConnect = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default reduxForm({
  form: 'SignUp', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SignUpConnect);
