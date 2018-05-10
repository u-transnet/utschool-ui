// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
//
import Avatar from 'material-ui/Avatar';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import Button from 'material-ui/Button';
//
import LoginDialog from '../dialogs/loginDialog';
import {
  setTeacherLectures,
  setParticipants,
  setApplications
} from '../../actions/lecturesAction';
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
  openDialog: boolean,
  confirmAccept: boolean
};

class ApplicationsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openDialog: false,
      confirmAccept: false
    };
  }

  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };

  handleCloseDialog = () => {
    this.setState({ openDialog: false });
  };

  onAcceptApplication = password => {
    try {
      acceptApplication(this.props.account, this.props.studentId, password)
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
    const { confirmAccept, openDialog } = this.state;
    const { userData } = this.props;
    let userName = userData.first_name + ' ' + userData.last_name;
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
        <LoginDialog
          dialogTitle="Логин"
          confirmText="Заявка подтверждена"
          confirmAccept={confirmAccept}
          openDialog={openDialog}
          closeDialog={this.handleCloseDialog}
          pass={this.onAcceptApplication}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsItem);
