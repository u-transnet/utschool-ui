// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { SubmissionError } from 'redux-form';
import { Login } from 'bitsharesjs';
//
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
//
import LoginDialog from '../dialogs/loginDialog';
//
import './lecture.css';

// conts for settings dropdown
const MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const ITEM_HEIGHT = 48;

type Props = {
  registrationLecture: Function,
  handleSubmit: Function,
  account: string,
  apiInit: Object,
  lecture: any,
  state: any
};
type State = {
  anchorEl: any,
  openDialog: boolean,
  confirmRegistration: boolean,
  dialogLoader: boolean,
  showBtn: boolean
};
class LectureCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null,
      openDialog: false,
      confirmRegistration: false,
      dialogLoader: false,
      showBtn: true
    };
  }

  // functions for settings dropdown
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // dialog functions
  handleClickOpenDialog = () => {
    this.setState({ openDialog: true });
  };
  handleCloseDialog = () => {
    this.setState({ openDialog: false });
    this.setState({ dialogLoader: false });
    this.setState({ confirmRegistration: false });
  };

  // registration function
  registration = (password: string) => {
    try {
      let keys = Login.generateKeys(this.props.account, password, '', 'BTS');
      let privateKey = keys.privKeys.active.toWif();
      this.props.apiInit.setPrivateKey(privateKey);
      this.setState({ dialogLoader: true });

      this.props.apiInit.studentApi
        .applyForLecture(this.props.lecture.account)
        .then(resp => {
          this.setState({ dialogLoader: false });
          this.setState({ confirmRegistration: true });
          this.setState({ showBtn: false });
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
    const { lecture, state } = this.props;
    const {
      anchorEl,
      confirmRegistration,
      openDialog,
      dialogLoader,
      showBtn
    } = this.state;
    return (
      <div className="lecture-card">
        <Card>
          <CardHeader
            action={
              <div className="dd">
                <IconButton
                  color="inherit"
                  aria-label="More"
                  aria-owns={anchorEl ? 'long-menu' : null}
                  aria-haspopup="true"
                  onClick={this.handleClick}
                >
                  <i className="material-icons">more_vert</i>
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={this.handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: 200
                    }
                  }}
                >
                  {MENU_OPTIONS.map(option => (
                    <MenuItem key={option} onClick={this.handleClose}>
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            }
            title={lecture.title}
          />
          <CardContent>
            <p>{lecture.text}</p>
            <p>
              <strong>Лектор:</strong> {lecture.teachername}
            </p>
          </CardContent>
          <CardActions className="card-actions">
            <ul className="lecture-status">
              <li>
                <em>Осталось мест {state.ticket.balance}</em>
              </li>
            </ul>
            {state.ticket.balance && showBtn ? (
              <Button
                variant="raised"
                color="primary"
                className="action-btn"
                onClick={this.handleClickOpenDialog}
              >
                Записаться
              </Button>
            ) : null}
          </CardActions>
        </Card>
        <LoginDialog
          dialogLoader={dialogLoader}
          dialogTitle="Логин"
          confirmText="Регистрация прошла успешно и ожидает подтверждения преподавателя."
          confirmAccept={confirmRegistration}
          openDialog={openDialog}
          closeDialog={this.handleCloseDialog}
          pass={this.registration}
        />
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    apiInit: state.app.apiInit,
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LectureCard);
