// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
//
import registrationLecture from '../api/registrationOnLecture';
//
import './lecture.css';

const MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const ITEM_HEIGHT = 48;

type Props = {
  registrationLecture: Function,
  account: string,
  lecture: any,
  state: any
};
type State = {
  anchorEl: any
};
class LectureCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null
    };
  }
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { lecture, state, registrationLecture, account } = this.props;
    const { anchorEl } = this.state;
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
          {/* TODO need add checking */}
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
              onClick={() => registration(account, lecture.account)}
            >
              Записаться
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  }
}
function registration(account, lecture) {
  registrationLecture(account, lecture)
    .then(resp => resp)
    .catch(error => error);
}
function mapStateToProps(state) {
  return {
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(LectureCard);
