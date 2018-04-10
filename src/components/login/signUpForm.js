// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//
import renderAccountField from './accountField';
import renderPasswordField from './passwordField';
import renderRememberCheckbox from './rememberCheckbox';
//
import { setAccountName } from '../../actions/actionsUser';
import validate from './validate';
import userStore from '../../stores/usersTempData';
import history from '../../history';
//
import './login.css';

type Props = {
  handleSubmit: Function,
  setAccount: Function
};

class SignUpForm extends React.Component<Props> {
  pushNewUser = (newAccount: string) => {
    userStore.push({
      account: newAccount,
      name: newAccount,
      faculty: '',
      accepted: 'false',
      avatar: '/avatars/guest.png',
      role: 'Новый пользователь'
    });
  };
  render() {
    const { handleSubmit, setAccount } = this.props; // No fields prop
    const sleep: any = ms => new Promise(resolve => setTimeout(resolve, ms));

    let signupSubmit = (values: any) => {
      let accounts: any[] = [];
      for (let i of userStore) {
        accounts.push(i.account);
      }
      return sleep(100).then(() => {
        let passValid = values.password
          ? values.password.match(
              /(?=.*[0-9])(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g
            )
          : false;
        if (accounts.includes(values.newaccount)) {
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
          this.pushNewUser(values.newaccount);
          setAccount(values.newaccount);
        }
      });
    };
    return (
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
    );
  }
}

const mapStateToProps = state => {
  return {};
};

const mapDispatchToProps = dispatch => ({
  setAccount(val) {
    dispatch(setAccountName(val));
    history.push('/dashboard');
  }
});

const SignUpFormConnect = connect(mapStateToProps, mapDispatchToProps)(
  SignUpForm
);

export default reduxForm({
  form: 'SignUpForm', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true,
  validate
})(SignUpFormConnect);
