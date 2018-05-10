// @flow
import * as React from 'react';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
import Button from 'material-ui/Button';
//
import renderPasswordField from '../login/passwordField';
import './dialog.css';

type Props = {
  handleSubmit: Function,
  pass: Function,
  closeDialog: Function,
  confirmAccept: boolean,
  openDialog: boolean,
  dialogTitle: string,
  confirmText: string
};
type State = {};

class LoginDialog extends React.Component<Props, State> {
  render() {
    let loginSubmit = (values: any) => {
      // validation of password
      let passValid = values.password
        ? values.password.match(
            /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{12,}/g
          )
        : false;

      if (!passValid) {
        throw new SubmissionError({
          password: '12 символов минимум (цыфры, большие и маленькие буквы).',
          _error: 'SignUp failed!'
        });
      } else {
        this.props.pass(values.password);
      }
      // end validation of password
    };
    return (
      <Dialog open={this.props.openDialog} onClose={this.props.closeDialog}>
        <form onSubmit={this.props.handleSubmit(loginSubmit)}>
          <DialogTitle>{this.props.dialogTitle}</DialogTitle>
          {this.props.confirmAccept ? (
            <div className="dialog-wrap">
              <DialogContent>
                <DialogContentText>{this.props.confirmText}</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.closeDialog} color="primary">
                  Закрыть
                </Button>
              </DialogActions>
            </div>
          ) : (
            <div className="dialog-wrap">
              <DialogContent>
                <Field
                  className="dialog-field"
                  name="password"
                  component={renderPasswordField}
                />
              </DialogContent>
              <DialogActions>
                <Button onClick={this.props.closeDialog} color="primary">
                  Отмена
                </Button>
                <Button type="submit" color="primary">
                  Логин
                </Button>
              </DialogActions>
            </div>
          )}
        </form>
      </Dialog>
    );
  }
}

export default reduxForm({
  form: 'login', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(LoginDialog);
