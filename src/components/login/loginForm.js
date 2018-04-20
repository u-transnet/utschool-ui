// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//
import renderAccountField from './accountField';
import renderRememberCheckbox from './rememberCheckbox';
//
import lecturesBTSApi from '../api/lecturesBTSApi';
import getUserFaucetApi from '../api/getUserFaucetApi';
//
import { toggleForm } from '../../actions/loginAction';
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
  onToggleForm: Function,
  errorFlag: Function,
  handleSubmit: Function,
  setAccount: Function,
  onSetTitle: Function,
  onSetLectures: Function,
  onSetAvatar: Function,
  onSetFirstName: Function,
  onSetLastName: Function,
  formFlag: boolean,
  account: string
};

type State = {};

class LoginForm extends React.Component<Props, State> {
  render() {
    const {
      handleSubmit,
      onToggleForm,
      setAccount,
      onSetTitle,
      onSetLectures,
      onSetAvatar,
      onSetFirstName,
      onSetLastName,
      formFlag
    } = this.props; // No fields prop

    let loginSubmit = (values: any) => {
      let lecturesBTSData = lecturesBTSApi(values.account);
      let userFausetData = getUserFaucetApi(values.account);

      return userFausetData
        .then(data => {
          if (!data) {
            throw new SubmissionError({
              account: 'Такой учетной записи не существует.',
              _error: 'Login failed!'
            });
          } else {
            lecturesBTSData.then(resp => {
              onSetLectures(resp);
            });
            onSetAvatar(data.photo);
            onSetFirstName(data.first_name);
            onSetLastName(data.last_name);
            onSetTitle('Лекции');
            setAccount(values.account);
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
      <form onSubmit={handleSubmit(loginSubmit)}>
        <Grid item xs={12}>
          <Field
            name="account"
            className="login-field"
            component={renderAccountField}
          />
        </Grid>
        <Grid item xs={12}>
          <div className="check-el">
            <Field name="rememberMe" component={renderRememberCheckbox} />
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
            onClick={() => onToggleForm(formFlag)}
          >
            Создать акаунт
          </Button>
        </Grid>
      </form>
    );
  }
}

const mapStateToProps = state => {
  return {
    formFlag: state.login.formFlag
  };
};

const mapDispatchToProps = dispatch => ({
  onToggleForm(val) {
    dispatch(toggleForm(val));
  },
  setAccount(val) {
    dispatch(setAccountName(val));
    history.push('/dashboard');
  },
  onSetTitle(val) {
    dispatch(setTitle(val));
  },
  onSetLectures(val) {
    dispatch(setLectures(val));
  },
  onSetAvatar(val) {
    dispatch(setAvatar(val));
  },
  onSetFirstName(val) {
    dispatch(setFirstName(val));
  },
  onSetLastName(val) {
    dispatch(setLastName(val));
  }
});

const LoginFormConnect = connect(mapStateToProps, mapDispatchToProps)(
  LoginForm
);

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(LoginFormConnect);
