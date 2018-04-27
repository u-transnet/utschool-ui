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
//
import vkAuthorization from '../authorization/vkAuthorization';
//
import { setAccountName } from '../../actions/actionsUser';
import { setVkToken } from '../../actions/loginAction';
import validate from './validate';
import LoginHeader from './loginHeader';
import history from '../../history';
//
import './login.css';

type Props = {
  handleSubmit: Function,
  setAccount: Function,
  onSetVkToken: Function,
  vkToken: string
};
type State = {
  tokenFlag: boolean
};

class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tokenFlag: false
    };
  }
  componentDidMount() {
    //get vk token
    let url = window.location.href;
    let hashData = new URL(url).hash;
    if (hashData && hashData.indexOf('access_denied') === -1) {
      let token = hashData
        .split('&')
        .filter(function(el) {
          return el.match('access_token') !== null ? true : false;
        })[0]
        .split('=')[1];
      this.props.onSetVkToken(token);
      this.setState({ tokenFlag: true });
    }
  }

  render() {
    const { handleSubmit, setAccount, vkToken } = this.props; // No fields prop
    let signupSubmit = (values: any) => {
      let putUserData = putUserFaucetApi(
        values.newaccount,
        values.password,
        'vk',
        vkToken
      );
      return putUserData.then(resp => {
        if (resp.error) {
          switch (resp.error.code) {
            case 103: {
              throw new SubmissionError({
                newaccount: 'Такая запись уже существует.',
                _error: 'SignUp failed!'
              });
            }
            case 104: {
              throw new SubmissionError({
                newaccount: 'Не валидная учетная запись.',
                _error: 'SignUp failed!'
              });
            }
            case 107: {
              throw new SubmissionError({
                newaccount: 'Не валидная учетная запись.',
                _error: 'SignUp failed!'
              });
            }
            case 110: {
              throw new SubmissionError({
                newaccount: 'Вы уже регистрировались из этой соцсети.',
                _error: 'SignUp failed!'
              });
            }
            default:
              break;
          }
        }
        // go to lectures
        //TODO нужно забрать дату по юзерам после регистраци
        setAccount(values.newaccount);
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
            {!this.state.tokenFlag ? (
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
            ) : (
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
                    <Field
                      name="rememberMe"
                      component={renderRememberCheckbox}
                    />
                  </div>
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
            )}
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    vkToken: state.login.vkToken
  };
}

const mapDispatchToProps = dispatch => ({
  setAccount(val) {
    dispatch(setAccountName(val));
    history.push('/dashboard');
  },
  onSetVkToken(val) {
    dispatch(setVkToken(val));
  }
});

const SignUpConnect = connect(mapStateToProps, mapDispatchToProps)(SignUp);

export default reduxForm({
  form: 'SignUp', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SignUpConnect);
