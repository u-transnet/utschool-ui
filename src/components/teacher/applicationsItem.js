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
import {
  setTeacherLectures,
  setParticipants,
  setApplications
} from '../../actions/lecturesAction';
import renderPasswordField from '../login/passwordField';
import acceptApplication from '../api/acceptApplication';
import getUserFaucetApi from '../api/getUserFaucetApi';
//
import './teacher.css';

type Props = {
  handleSubmit: Function,
  onSetTeacherLectures: Function,
  onSetParticipants: Function,
  onSetApplications: Function,
  userData: any,
  participants: any,
  applications: any,
  currentLecture: any,
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
          if (resp.expiration) {
            this.setState({ confirmAccept: true });
            setTimeout(() => {
              this.props.onSetTeacherLectures([]);
              this.props.onSetApplications([]);
              this.props.onSetParticipants([]);
              // TODO: нужно создать функцию проверки в отдельном файле c изменением после подтверждения
              if (!this.props.participants.length) {
                let usersData = [];
                let n = this.props.currentLecture.additionalInfo.participants
                  .length;
                for (let i of this.props.currentLecture.additionalInfo
                  .participants) {
                  getUserFaucetApi(i.name)
                    .then(resp => {
                      usersData.push(resp);
                      n--;
                      if (!n) {
                        this.props.onSetParticipants(usersData);
                      }
                    })
                    .catch(error => alert(error));
                }
              }
              if (!this.props.applications.length) {
                let usersData = [];
                let n = this.props.currentLecture.additionalInfo.applications
                  .length;
                for (let i of this.props.currentLecture.additionalInfo
                  .applications) {
                  getUserFaucetApi(i.account.name)
                    .then(resp => {
                      usersData.push({
                        userData: resp,
                        studentId: i.id
                      });
                      n--;
                      if (!n) {
                        this.props.onSetApplications(usersData);
                      }
                    })
                    .catch(error => alert(error));
                }
              }
            }, 5000);
          } else {
            return resp;
          }
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
          open={this.state.open}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(loginSubmit)}>
            <DialogTitle id="form-dialog-title">Логин</DialogTitle>
            {confirmAccept ? (
              <div className="dialog-wrap">
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
              <div className="dialog-wrap">
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
    account: state.user.account,
    currentLecture: state.lectures.currentLecture,
    participants: state.lectures.participants,
    applications: state.lectures.applications
  };
}

const mapDispatchToProps = dispatch => ({
  onSetTeacherLectures(val) {
    dispatch(setTeacherLectures(val));
  },
  onSetParticipants(val) {
    dispatch(setParticipants(val));
  },
  onSetApplications(val) {
    dispatch(setApplications(val));
  }
});

const ApplicationsConnect = connect(mapStateToProps, mapDispatchToProps)(
  ApplicationsItem
);

export default reduxForm({
  form: 'login', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(ApplicationsConnect);
