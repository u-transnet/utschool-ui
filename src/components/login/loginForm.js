// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
import Api from 'utschool-js';
//
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//
import renderAccountField from './accountField';
import renderRememberCheckbox from './rememberCheckbox';
//
import { toggleForm } from '../../actions/loginAction';
import { setAccountName } from '../../actions/actionsUser';
import { setLectures } from '../../actions/lecturesAction';
import { setTitle } from '../../actions';
//import getLecturesBTS from '../../services/getLecturesBTS';
import validate from './validate';
import userStore from '../../stores/usersTempData';
import history from '../../history';
//
import './login.css';

type Props = {
  onToggleForm: Function,
  handleSubmit: Function,
  setAccount: Function,
  onSetTitle: Function,
  onSetLectures: Function,
  formFlag: boolean,
  account: string
};

class LoginForm extends React.Component<Props> {
  render() {
    const {
      handleSubmit,
      onToggleForm,
      setAccount,
      onSetTitle,
      onSetLectures
    } = this.props; // No fields prop
    const sleep: any = ms => new Promise(resolve => setTimeout(resolve, ms));

    let loginSubmit = (values: any) => {
      let accounts: any[] = [];
      for (let i of userStore) {
        accounts.push(i.account);
      }
      return sleep(100).then(() => {
        if (!accounts.includes(values.account)) {
          throw new SubmissionError({
            account: 'Такой учетной записи не существует.',
            _error: 'Login failed!'
          });
        } else {
          let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
          let accountName = values.account; // Имя учетной записи
          let privateKey = null; //Приватный ключ

          Api.init(nodeUrl, accountName, privateKey).then(api => {
            api.studentApi
              .getLectures()
              .then(resp => {
                onSetLectures(resp);
                onSetTitle('Лекции');
                setAccount(values.account);
              })
              .catch(error => {
                alert(error);
              });
          });
        }
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
            onClick={() => onToggleForm(this.props.formFlag)}
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
