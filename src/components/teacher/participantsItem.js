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
  confirmAccept: boolean,
  openSessionDialog: boolean,
  openGradeDialog: boolean
};

class ParticipantsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sessionActive: false,
      gradeActive: false,
      confirmAccept: false,
      openSessionDialog: false,
      openGradeDialog: false
    };
  }

  componentDidMount() {
    // indications
    //console.log(this.props.userData.name);
  }

  // send Session Token
  getSessionPassword = (password: string) => {
    try {
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.props.apiInit.teacherApi
        .sendSessionToken(this.props.lectureAccount, this.props.userData.name)
        .then(resp => {
          this.props.apiInit.studentApi
            .getLectureStats(this.props.lectureAccount)
            .then(resp => {
              this.setState({ sessionActive: resp['1.3.3348'].accepted });
            });
          this.setState({ openSessionDialog: false });
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
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.props.apiInit.teacherApi
        .sendGradeToken(this.props.lectureAccount, this.props.userData.name)
        .then(resp => {
          this.props.apiInit.studentApi
            .getLectureStats(this.props.lectureAccount)
            .then(resp => {
              this.setState({ gradeActive: resp['1.3.3349'].accepted });
            });
          this.setState({ openGradeDialog: false });
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
    this.setState({ openSessionDialog: false });
  };
  closeGradeDialog = () => {
    this.setState({ openGradeDialog: false });
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
      confirmAccept,
      openSessionDialog,
      openGradeDialog
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
          dialogTitle="Логин"
          confirmText="Подтверждено"
          confirmAccept={confirmAccept}
          openDialog={openSessionDialog}
          closeDialog={this.closeSessionDialog}
          pass={this.getSessionPassword}
        />
        <LoginDialog
          dialogTitle="Логин"
          confirmText="Подтверждено"
          confirmAccept={confirmAccept}
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
