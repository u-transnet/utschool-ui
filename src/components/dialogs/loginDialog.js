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
import { CircularProgress } from 'material-ui/Progress';
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
  confirmText: string,
  dialogLoader: boolean
};

class LoginDialog extends React.Component<Props> {
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
      <Dialog
        className="dialog-wrap"
        open={this.props.openDialog}
        onClose={this.props.closeDialog}
      >
        <form onSubmit={this.props.handleSubmit(loginSubmit)}>
          <DialogTitle>{this.props.dialogTitle}</DialogTitle>
          {this.props.confirmAccept ? (
            <div className="dialog-content">
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
            <div className="dialog-content">
              <DialogContent>
                {this.props.dialogLoader ? (
                  <CircularProgress className="dialog-loader" size={40} />
                ) : (
                  <Field
                    className="dialog-field"
                    name="password"
                    component={renderPasswordField}
                  />
                )}
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
