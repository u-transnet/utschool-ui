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

type State = {
  errorFlag: boolean
};

class LoginForm extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      errorFlag: false
    };
  }
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
    const { errorFlag } = this.state;
    const sleep: any = ms => new Promise(resolve => setTimeout(resolve, ms));
    let loginSubmit = (values: any) => {
      return sleep(100).then(() => {
        fetch(
          'https://cors-anywhere.herokuapp.com/' +
            `https://utschool.herokuapp.com/api/v1/accounts?accounts=${
              values.account
            }`,
          {
            mode: 'cors'
          }
        )
          .then(function(response) {
            if (response.status !== 200) {
              alert(
                'Looks like there was a problem. Status Code: ' +
                  response.status
              );
              return;
            }

            // Examine the text in the response
            return response.json();
          })
          .then(function(data: any) {
            if (data.length > 0) {
              let nodeUrl = 'wss://bitshares.openledger.info/ws'; // Url ноды Bitshares
              let accountName = values.account; // Имя учетной записи
              let privateKey = null; //Приватный ключ

              Api.init(nodeUrl, accountName, privateKey).then(api => {
                api.studentApi
                  .getLectures()
                  .then(resp => {
                    onSetAvatar(data[0].photo);
                    onSetFirstName(data[0].first_name);
                    onSetLastName(data[0].last_name);
                    onSetLectures(resp);
                    onSetTitle('Лекции');
                    setAccount(values.account);
                  })
                  .catch(error => {
                    alert(error);
                  });
              });
            } else {
              this.setState({ errorFlag: true });
              alert(errorFlag);
            }
          })
          .catch(function(error) {
            alert('error ' + error);
          });
        if (errorFlag) {
          throw new SubmissionError({
            account: 'Такой учетной записи не существует.',
            _error: 'Login failed!'
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
