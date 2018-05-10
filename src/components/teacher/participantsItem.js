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
import IconButton from 'material-ui/IconButton';
//
import sendSession from '../api/sendSession';
import LoginDialog from '../dialogs/loginDialog';
import './teacher.css';

type Props = {
  account: string,
  userData: any,
  lecturesBTS: any,
  lectureAccount: string
};
type State = {
  sessionActive: boolean,
  gradeActive: boolean,
  confirmAccept: boolean,
  openSessionDialog: boolean
};

class ParticipantsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      sessionActive: false,
      gradeActive: false,
      confirmAccept: false,
      openSessionDialog: false
    };
  }
  getSessionPassword = (password: string) => {
    try {
      sendSession(
        this.props.account,
        this.props.userData.name,
        this.props.lectureAccount,
        password
      )
        .then(resp => {
          this.setState({ sessionActive: true });
          this.setState({ openSessionDialog: false });
        })
        .catch(error => error);
    } catch (error) {
      throw new SubmissionError({
        password: 'Неправильный пароль',
        _error: 'Login failed!'
      });
    }
  };
  closeSessionDialog = () => {
    this.setState({ openSessionDialog: false });
  };
  session = () => {
    this.setState({ openSessionDialog: true });
  };
  grade = () => {
    this.setState({ gradeActive: true });
  };
  render() {
    const {
      sessionActive,
      gradeActive,
      confirmAccept,
      openSessionDialog
    } = this.state;
    const { userData } = this.props;
    let userName = userData.first_name + ' ' + userData.last_name;
    return (
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
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsItem);
