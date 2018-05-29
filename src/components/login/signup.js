// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import { CircularProgress } from 'material-ui/Progress';
//
import renderAccountField from './accountField';
import renderPasswordField from './passwordField';
import renderRememberCheckbox from './rememberCheckbox';
import getLectureFaucetApi from '../api/getLectureFaucetApi';
import getLectureDataApi from '../api/getLectureDataApi';
import putUserFaucetApi from '../api/putUserFaucetApi';
import vkAuthorization from '../authorization/vkAuthorization';
import { setVkToken } from '../../actions/loginAction';
import {
  setAccountName,
  setAvatar,
  setFirstName,
  setLastName
} from '../../actions/actionsUser';
import { setLectures } from '../../actions/lecturesAction';
import { setTitle } from '../../actions';
import validate from './validate';
import LoginHeader from './loginHeader';
import history from '../../history';
//
import './login.css';

type Props = {
  apiInit: Object,
  handleSubmit: Function,
  setAccount: Function,
  onSetVkToken: Function,
  onSetTitle: Function,
  onSetAvatar: Function,
  onSetFirstName: Function,
  onSetLastName: Function,
  onSetLectures: Function,
  vkToken: string
};
type State = {
  tokenFlag: boolean,
  loaderFlag: boolean
};

class SignUp extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      tokenFlag: false,
      loaderFlag: false
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
    const {
      handleSubmit,
      setAccount,
      vkToken,
      onSetAvatar,
      onSetFirstName,
      onSetLastName,
      onSetLectures
    } = this.props; // No fields prop
    const { loaderFlag } = this.state;
    let signupSubmit = (values: any) => {
      // put new user data to faucet
      return putUserFaucetApi(
        values.newaccount,
        values.password,
        'vk',
        vkToken
      ).then(resp => {
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
        } else {
          // save data to stores
          setAccount(values.newaccount);
          onSetAvatar(resp.account.user_data.photo);
          onSetFirstName(resp.account.user_data.first_name);
          onSetLastName(resp.account.user_data.last_name);
          // added waiting loader
          this.setState({ loaderFlag: true });
          // get lectures data from bitsares

          let lecturesData = [];
          this.props.apiInit.studentApi.getLectures().then(resp => {
            let lectureBTSData = [];
            let accounts = '';
            for (let i of resp) {
              lectureBTSData.unshift({
                ticket: {
                  accepted: i.stats['1.3.3347'].accepted,
                  balance: i.stats['1.3.3347'].balance
                },
                settion: {
                  accepted: i.stats['1.3.3348'].accepted,
                  balance: i.stats['1.3.3348'].balance
                },
                grade: {
                  accepted: i.stats['1.3.3349'].accepted,
                  balance: i.stats['1.3.3349'].balance
                }
              });
              accounts = accounts + i.name + ',';
            }
            accounts = accounts.slice(0, -1);
            getLectureFaucetApi(accounts).then(resp => {
              let n = 0;
              let j = resp.length;
              for (let i of resp) {
                //get lecture data from vk
                getLectureDataApi(i.topic_url, i.account_name).then(resp => {
                  lecturesData.push({
                    lecture: resp,
                    state: lectureBTSData[n]
                  });
                  n++;
                  if (n === j) {
                    // save lectire data to store
                    onSetLectures(lecturesData);
                    // go to dashboard page
                    history.push('/dashboard');
                  }
                });
              }
            });
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
                {loaderFlag ? (
                  <CircularProgress className="centered-loader" size={50} />
                ) : (
                  <div>
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
                  </div>
                )}
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
    vkToken: state.login.vkToken,
    apiInit: state.app.apiInit
  };
}

const mapDispatchToProps = dispatch => ({
  setAccount(val) {
    dispatch(setAccountName(val));
  },
  onSetVkToken(val) {
    dispatch(setVkToken(val));
  },
  onSetTitle(val) {
    dispatch(setTitle(val));
  },
  onSetAvatar(val) {
    dispatch(setAvatar(val));
  },
  onSetFirstName(val) {
    dispatch(setFirstName(val));
  },
  onSetLastName(val) {
    dispatch(setLastName(val));
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
