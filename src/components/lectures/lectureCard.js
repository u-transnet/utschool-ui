// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm, SubmissionError } from 'redux-form';
//
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog';
//
import renderPasswordField from '../login/passwordField';
import registrationLecture from '../api/registrationOnLecture';
//
import './lecture.css';

const MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const ITEM_HEIGHT = 48;

type Props = {
  registrationLecture: Function,
  handleSubmit: Function,
  account: string,
  lecture: any,
  state: any
};
type State = {
  anchorEl: any,
  open: boolean,
  confirmRegistration: boolean
};
class LectureCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null,
      open: false,
      confirmRegistration: false
    };
  }
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleClickOpenDialog = () => {
    this.setState({ open: true });
  };

  handleCloseDialog = () => {
    this.setState({ open: false });
  };

  registration(account, lecture, password) {
    try {
      registrationLecture(account, lecture, password)
        .then(resp => {
          this.setState({ confirmRegistration: true });
        })
        .catch(error => error);
    } catch (error) {
      throw new SubmissionError({
        password: 'Неправильный пароль',
        _error: 'Login failed!'
      });
    }
  }

  render() {
    const { lecture, state, account, handleSubmit } = this.props;
    const { anchorEl, confirmRegistration } = this.state;
    let loginSubmit = (values: any) => {
      this.registration(account, lecture.account, values.password);
      this.handleCloseDialog;
    };
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
            <Button
              variant="raised"
              color="primary"
              className="action-btn"
              onClick={this.handleClickOpenDialog}
            >
              Записаться
            </Button>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.open}
          onClose={this.handleCloseDialog}
          aria-labelledby="form-dialog-title"
        >
          <form onSubmit={handleSubmit(loginSubmit)}>
            <DialogTitle id="form-dialog-title">Логин</DialogTitle>
            {confirmRegistration ? (
              <div>
                <DialogContent>
                  <DialogContentText>
                    Регистрация прошла успешно и ожидает подтверждения
                    преподавателя.
                  </DialogContentText>
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
  };
}

const mapDispatchToProps = dispatch => ({});

const lectureCardConnect = connect(mapStateToProps, mapDispatchToProps)(
  LectureCard
);

export default reduxForm({
  form: 'login', // a unique identifier for this form
  destroyOnUnmount: false,
  forceUnregisterOnUnmount: true
})(lectureCardConnect);
