// @flow

import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
//
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Button from 'material-ui/Button';
//
import validate from './validate';
import cheсkUser from './checkUser';
import renderAccountField from './accoutnField';
import renderRememberCheckbox from './rememberCheckbox';
//
import './Login.css';

type Props = {
  handleSubmit: Function,
  errors: any
};

class LoginForm extends React.Component<Props> {
  render() {
    const { handleSubmit } = this.props; // No fields prop
    return (
      <form onSubmit={handleSubmit(cheсkUser)}>
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
            component={Link}
            to="/signup"
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
})(LoginForm);
