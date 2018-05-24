// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Api from 'utschool-js';
//
import Grid from 'material-ui/Grid';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
//
import getLectureFaucetApi from '../api/getLectureFaucetApi';
import getLectureDataApi from '../api/getLectureDataApi';
import getUserFaucetApi from '../api/getUserFaucetApi';
import renderAccountField from './accountField';
import renderRememberCheckbox from './rememberCheckbox';
import LoginHeader from './loginHeader';
import {
  setAccountName,
  setAvatar,
  setFirstName,
  setLastName,
  setUserRole
} from '../../actions/actionsUser';
import {
  setLectures,
  setTeacherLectures,
  setParticipants,
  setApplications,
  setCurrentLecture
} from '../../actions/lecturesAction';
import { setTitle, setApiInit } from '../../actions';
import validate from './validate';
import history from '../../history';
//
import './login.css';

type Props = {
  onChangeRole: Function,
  onSetLectures: Function,
  onSetTeacherLectures: Function,
  onSetParticipants: Function,
  onSetApplications: Function,
  onSetCurrentLecture: Function,
  onSetApiInit: Function,
  errorFlag: Function,
  handleSubmit: Function,
  setAccount: Function,
  onSetTitle: Function,
  onSetAvatar: Function,
  onSetFirstName: Function,
  onSetLastName: Function,
  account: string
};
type State = {
  lecturesData: Array<any>,
  loaderFlag: boolean
};
class Login extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      lecturesData: [],
      loaderFlag: false
    };
  }
  clearData() {
    this.props.onSetTitle('Лекции');
    this.props.onChangeRole('Студент');
    this.props.onSetLectures([]);
    this.props.onSetTeacherLectures([]);
    this.props.onSetParticipants([]);
    this.props.onSetApplications([]);
    this.props.onSetCurrentLecture([]);
    localStorage.clear();
  }
  render() {
    const {
      handleSubmit,
      setAccount,
      onSetTitle,
      onSetAvatar,
      onSetFirstName,
      onSetLastName,
      onSetLectures,
      onSetApiInit
    } = this.props; // No fields prop
    const { loaderFlag } = this.state;
    let loginSubmit = (values: any) => {
      // clear data
      this.clearData();
      // save current to store
      setAccount(values.account);
      // get user data from faucet
      return getUserFaucetApi(values.account)
        .then(data => {
          if (!data.length) {
            throw new SubmissionError({
              account: 'Такой учетной записи не существует.',
              _error: 'Login failed!'
            });
          } else {
            // added waiting loader
            this.setState({ loaderFlag: true });
            // connect to bitshares
            let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
            let accountName = values.account;
            let privateKey = null;
            let lecturesData = [];
            Api.init(nodeUrl, accountName, privateKey).then(api => {
              // save init api to store
              onSetApiInit(api);
              // get lectures data from bitfares
              api.studentApi.getLectures().then(resp => {
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
                // get lecture data from faucet
                getLectureFaucetApi(accounts).then(resp => {
                  let n = 0;
                  for (let i of resp) {
                    //get lecture data from vk
                    getLectureDataApi(i.topic_url, i.name).then(resp => {
                      lecturesData.push({
                        lecture: resp,
                        state: lectureBTSData[n]
                      });
                      // save lectire data to store
                      onSetLectures(lecturesData);
                      // go to dashboard page
                      setTimeout(() => {
                        history.push('/dashboard');
                      }, 500);
                      n++;
                    });
                  }
                  // save other data
                  onSetAvatar(data[0].photo);
                  onSetFirstName(data[0].first_name);
                  onSetLastName(data[0].last_name);
                  onSetTitle('Лекции');
                });
              });
            });
            // end of get lectures function
          }
        })
        .catch(error => {
          throw new SubmissionError({
            account: 'Такой учетной записи не существует.',
            _error: 'Login failed!'
          });
        });
    };
    return (
      <div className="login-wrap">
        <div className="login-box">
          <Grid container spacing={0}>
            <LoginHeader />
            <form onSubmit={handleSubmit(loginSubmit)}>
              {loaderFlag ? (
                <CircularProgress className="centered-loader" size={50} />
              ) : (
                <div>
                  <Grid item xs={12}>
                    <Field
                      name="account"
                      className="login-field"
                      component={renderAccountField}
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
                      Логин
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      variant="raised"
                      size="medium"
                      color="primary"
                      className="login-button"
                      component={Link}
                      to="/sign-up"
                    >
                      Создать акаунт
                    </Button>
                  </Grid>
                </div>
              )}
            </form>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({
  setAccount(val) {
    dispatch(setAccountName(val));
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
  },
  onSetApiInit(val) {
    dispatch(setApiInit(val));
  },
  onChangeRole(val) {
    dispatch(setUserRole(val));
  },
  onSetTeacherLectures(val) {
    dispatch(setTeacherLectures(val));
  },
  onSetParticipants(val) {
    dispatch(setParticipants(val));
  },
  onSetApplications(val) {
    dispatch(setApplications(val));
  },
  onSetCurrentLecture(val) {
    dispatch(setCurrentLecture(val));
  }
});

const LoginFormConnect = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: 'Login', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(LoginFormConnect);
