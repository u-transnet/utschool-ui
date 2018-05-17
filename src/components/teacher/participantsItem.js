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
  userData: any,
  lecturesBTS: any,
  apiInit: any,
  lectureAccount: string
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
      sessionActive: false,
      gradeActive: false,
      confirmAcceptGrade: false,
      confirmAcceptSession: false,
      openSessionDialog: false,
      openGradeDialog: false,
      sessionDialogLoader: false,
      gradeDialogLoader: false
    };
  }

  componentDidMount() {
    // indications
    //console.log(this.props.userData.name);
  }

  // send Session Token
  getSessionPassword = (password: string) => {
    try {
      this.setState({ sessionDialogLoader: true });
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.props.apiInit.teacherApi
        .sendSessionToken(this.props.lectureAccount, this.props.userData.name)
        .then(resp => {
          this.props.apiInit.studentApi
            .getLectureStats(this.props.lectureAccount)
            .then(resp => {
              this.setState({ sessionDialogLoader: false });
              this.setState({ confirmAcceptSession: true });
              this.setState({ sessionActive: resp['1.3.3348'].accepted });
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
        .sendGradeToken(this.props.lectureAccount, this.props.userData.name)
        .then(resp => {
          this.props.apiInit.studentApi
            .getLectureStats(this.props.lectureAccount)
            .then(resp => {
              this.setState({ gradeDialogLoader: false });
              this.setState({ confirmAcceptGrade: true });
              this.setState({ gradeActive: resp['1.3.3349'].accepted });
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
          <ListItemSecondaryAction className="state-btns">
            <IconButton
              className={sessionActive ? 'active' : ''}
              onClick={this.session}
            >
              <i className="material-icons">assignment_ind</i>
            </IconButton>
            <IconButton
              className={gradeActive ? 'active' : ''}
              onClick={this.grade}
            >
              <i className="material-icons">assignment_turned_in</i>
            </IconButton>
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
