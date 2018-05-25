// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Login } from 'bitsharesjs';
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
//import getUserFaucetApi from '../api/getUserFaucetApi';
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
  apiInit: any,
  currentLecture: any,
  studentId: string,
  account: string
};
type State = {
  openDialog: boolean,
  confirmAccept: boolean,
  dialogLoader: boolean
};

class ApplicationsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openDialog: false,
      confirmAccept: false,
      dialogLoader: false
    };
  }
  // dialog functions
  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    this.setState({ dialogLoader: false });
    this.setState({ confirmAccept: false });
  };

  // accept function
  onAcceptApplication = password => {
    try {
      this.setState({ dialogLoader: true });
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.props.apiInit.teacherApi
        .acceptApplication(this.props.studentId)
        .then(resp => {
          if (resp.expiration) {
            this.setState({ dialogLoader: false });
            this.setState({ confirmAccept: true });
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
    const { confirmAccept, openDialog, dialogLoader } = this.state;
    const { userData } = this.props;
    let userName;
    userData
      ? (userName = userData.first_name + ' ' + userData.last_name)
      : null;
    return userData ? (
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
          dialogLoader={dialogLoader}
          dialogTitle="Логин"
          confirmText="Заявка подтверждена"
          confirmAccept={confirmAccept}
          openDialog={openDialog}
          closeDialog={this.handleCloseDialog}
          pass={this.onAcceptApplication}
        />
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    apiInit: state.app.apiInit,
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
