// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//
import Grid from 'material-ui/Grid';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
//get lectures
import lecturesBTSApi from '../api/lecturesBTSApi';
import getLectureFaucetApi from '../api/getLectureFaucetApi';
import getLectureDataApi from '../api/getLectureDataApi';
//end of get lectures
import getUserFaucetApi from '../api/getUserFaucetApi';
//
import renderAccountField from './accountField';
import renderRememberCheckbox from './rememberCheckbox';
import LoginHeader from './loginHeader';
import {
  setAccountName,
  setAvatar,
  setFirstName,
  setLastName
} from '../../actions/actionsUser';
import { setLectures } from '../../actions/lecturesAction';
import { setTitle } from '../../actions';
import validate from './validate';
import history from '../../history';
//
import './login.css';

type Props = {
  errorFlag: Function,
  handleSubmit: Function,
  setAccount: Function,
  onSetTitle: Function,
  onSetAvatar: Function,
  onSetFirstName: Function,
  onSetLastName: Function,
  onSetLextures: Function,
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
  render() {
    const {
      handleSubmit,
      setAccount,
      onSetTitle,
      onSetAvatar,
      onSetFirstName,
      onSetLastName,
      onSetLextures
    } = this.props; // No fields prop
    const { loaderFlag } = this.state;
    let loginSubmit = (values: any) => {
      let userFausetData = getUserFaucetApi(values.account);
      return userFausetData
        .then(data => {
          if (!data) {
            throw new SubmissionError({
              account: 'Такой учетной записи не существует.',
              _error: 'Login failed!'
            });
          } else {
            this.setState({ loaderFlag: true });
            // get lectures function
            let lecturesData = [];
            lecturesBTSApi(values.account).then(resp => {
              for (let i of resp) {
                let lectureState = {
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
                };
                getLectureFaucetApi(i.name).then(resp => {
                  getLectureDataApi(resp.topic_url).then(resp => {
                    lecturesData.push({
                      lecture: resp,
                      state: lectureState
                    });
                    onSetLextures(lecturesData);
                    //other data
                    onSetAvatar(data.photo);
                    onSetFirstName(data.first_name);
                    onSetLastName(data.last_name);
                    onSetTitle('Лекции');
                    setAccount(values.account);
                    //end of other data
                  });
                });
              }
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
  return {};
}

const mapDispatchToProps = dispatch => ({
  setAccount(val) {
    dispatch(setAccountName(val));
    setTimeout(() => {
      history.push('/dashboard');
    }, 500);
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
  onSetLextures(val) {
    dispatch(setLectures(val));
  }
});

const LoginFormConnect = connect(mapStateToProps, mapDispatchToProps)(Login);

export default reduxForm({
  form: 'Login', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(LoginFormConnect);
