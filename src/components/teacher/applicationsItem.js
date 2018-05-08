// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Avatar from 'material-ui/Avatar';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Button from 'material-ui/Button';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
//
import renderPasswordField from '../login/passwordField';
import acceptApplication from '../api/acceptApplication';
//
import './teacher.css';

type Props = {
  handleSubmit: Function,
  userData: any,
  studentId: string,
  account: string
};
type State = {
  open: boolean,
  confirmAccept: boolean
};

class ApplicationsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      open: false,
      confirmAccept: false
    };
  }

  handleClickOpenDialog = () => {
    this.setState({ open: true });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  acceptApplication = val => {
    try {
      acceptApplication(this.props.account, this.props.studentId, val)
        .then(resp => {
          console.log(resp.expiration);
          resp.expiration ? this.setState({ confirmAccept: true }) : null;
        })
        .catch(error => error);
    } catch (error) {
      throw new SubmissionError({
        password: 'Неправильный пароль',
        _error: 'Login failed!'
      });
    }
  };
  render() {
    const { confirmAccept } = this.state;
    const { userData, handleSubmit } = this.props;
    let userName = userData.first_name + ' ' + userData.last_name;
    let loginSubmit = (values: any) => {
      this.acceptApplication(values.password);
      this.handleCloseDialog;
    };
    return (
      <div>
        <ListItem>
          <Avatar alt={userName} src={userData.photo} />
          <ListItemText primary={userName} secondary="Студент" />
          <ListItemSecondaryAction>
            <Button
              variant="raised"
              color="primary"
              size="small"
              onClick={this.handleClickOpenDialog}
            >
              Принять
            </Button>
          </ListItemSecondaryAction>
        </ListItem>
        <Dialog
          className="dialog-wrap"
          open={this.state.open}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(loginSubmit)}>
            <DialogTitle id="form-dialog-title">Логин</DialogTitle>
            {confirmAccept ? (
              <div>
                <DialogContent>
                  <DialogContentText>Заявка подтверждена</DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseDialog} color="primary">
                    Закрыть
                  </Button>
                </DialogActions>
              </div>
            ) : (
              <div>
                <DialogContent>
                  <Field
                    className="dialog-field"
                    name="password"
                    component={renderPasswordField}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={this.handleCloseDialog} color="primary">
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.user.account
    // lecturesBTS: state.lectures.lecturesBTS
  };
}

const mapDispatchToProps = dispatch => ({});

const ApplicationsConnect = connect(mapStateToProps, mapDispatchToProps)(
  ApplicationsItem
);

export default reduxForm({
  form: 'login', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ApplicationsConnect);
