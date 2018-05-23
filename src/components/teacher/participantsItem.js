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
import IconButton from 'material-ui/IconButton';
//
import LoginDialog from '../dialogs/loginDialog';
import './teacher.css';

type Props = {
  account: string,
  lecturesBTS: any,
  apiInit: any,
  lectureAccount: string,
  name: string,
  first_name: string,
  last_name: string,
  photo: string,
  session: boolean,
  grade: boolean
};
type State = {
  sessionActive: boolean,
  gradeActive: boolean,
  confirmAcceptGrade: boolean,
  confirmAcceptSession: boolean,
  openSessionDialog: boolean,
  openGradeDialog: boolean,
  sessionDialogLoader: boolean,
  gradeDialogLoader: boolean
};

class ParticipantsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sessionActive: this.props.session,
      gradeActive: this.props.grade,
      confirmAcceptGrade: false,
      confirmAcceptSession: false,
      openSessionDialog: false,
      openGradeDialog: false,
      sessionDialogLoader: false,
      gradeDialogLoader: false
    };
  }

  // send Session Token
  getSessionPassword = (password: string) => {
    try {
      this.setState({ sessionDialogLoader: true });
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.props.apiInit.teacherApi
        .sendSessionToken(this.props.lectureAccount, this.props.name)
        .then(resp => {
          this.props.apiInit.studentApi
            .getLectureStats(this.props.lectureAccount)
            .then(resp => {
              this.setState({ sessionDialogLoader: false });
              this.setState({ confirmAcceptSession: true });
              this.setState({ sessionActive: true });
            });
        });
    } catch (error) {
      throw new SubmissionError({
        password: 'Неправильный пароль',
        _error: 'Login failed!'
      });
    }
  };

  // send Grade Token
  getGradePassword = (password: string) => {
    try {
      this.setState({ gradeDialogLoader: true });
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.props.apiInit.teacherApi
        .sendGradeToken(this.props.lectureAccount, this.props.name)
        .then(resp => {
          this.props.apiInit.studentApi
            .getLectureStats(this.props.lectureAccount)
            .then(resp => {
              this.setState({ gradeDialogLoader: false });
              this.setState({ confirmAcceptGrade: true });
              this.setState({ gradeActive: true });
            });
        });
    } catch (error) {
      throw new SubmissionError({
        password: 'Неправильный пароль',
        _error: 'Login failed!'
      });
    }
  };

  // dialog functions
  closeSessionDialog = () => {
    this.setState({ sessionDialogLoader: false });
    this.setState({ confirmAcceptSession: false });
    this.setState({ openSessionDialog: false });
  };
  closeGradeDialog = () => {
    this.setState({ openGradeDialog: false });
    this.setState({ gradeDialogLoader: false });
    this.setState({ confirmAcceptGrade: false });
  };
  session = () => {
    this.setState({ openSessionDialog: true });
  };
  grade = () => {
    this.setState({ openGradeDialog: true });
  };

  render() {
    const {
      sessionActive,
      gradeActive,
      confirmAcceptGrade,
      confirmAcceptSession,
      openSessionDialog,
      openGradeDialog,
      sessionDialogLoader,
      gradeDialogLoader
    } = this.state;
    const { first_name, last_name, photo } = this.props;
    let userName;
    first_name ? (userName = first_name + ' ' + last_name) : null;
    return userName ? (
      <div>
        <ListItem>
          <Avatar alt={userName} src={photo} />
          <ListItemText primary={userName} secondary="Студент" />
          <ListItemSecondaryAction className="state-btns">
            {sessionActive ? (
              <div className="icon-btn">
                <span>
                  <i className="active material-icons">assignment_ind</i>
                </span>
              </div>
            ) : (
              <IconButton onClick={this.session}>
                <i className="material-icons">assignment_ind</i>
              </IconButton>
            )}
            {gradeActive ? (
              <div className="icon-btn">
                <span>
                  <i className="active material-icons">assignment_turned_in</i>
                </span>
              </div>
            ) : (
              <IconButton onClick={this.grade}>
                <i className="material-icons">assignment_turned_in</i>
              </IconButton>
            )}
          </ListItemSecondaryAction>
        </ListItem>
        <LoginDialog
          dialogLoader={sessionDialogLoader}
          dialogTitle="Логин"
          confirmText="Подтверждено"
          confirmAccept={confirmAcceptSession}
          openDialog={openSessionDialog}
          closeDialog={this.closeSessionDialog}
          pass={this.getSessionPassword}
        />
        <LoginDialog
          dialogLoader={gradeDialogLoader}
          dialogTitle="Логин"
          confirmText="Подтверждено"
          confirmAccept={confirmAcceptGrade}
          openDialog={openGradeDialog}
          closeDialog={this.closeGradeDialog}
          pass={this.getGradePassword}
        />
      </div>
    ) : null;
  }
}

function mapStateToProps(state) {
  return {
    account: state.user.account,
    apiInit: state.app.apiInit
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsItem);
