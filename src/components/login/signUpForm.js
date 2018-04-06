// @flow

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
//
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//
import validate from './validate';
import signupSubmit from './signupSubmit';
import renderAccountField from './accountField';
import renderPasswordField from './passwordField';
import renderRememberCheckbox from './rememberCheckbox';
//
import './Login.css';

type Props = {
  handleSubmit: Function,
  errors: any
};

class SignUpForm extends React.Component<Props> {
  render() {
    const { handleSubmit } = this.props; // No fields prop
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

export default reduxForm({
  form: 'LoginForm', // a unique identifier for this form
  validate
})(SignUpForm);
