// @flow
import * as React from 'react';
import { connect } from 'react-redux';
//
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
//
import { setCurrentLecture } from '../../actions/lecturesAction';
import { setTitle, setBackToTeacherDashboard } from '../../actions';

//
import './teacher.css';

// conts for settings dropdown
const MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const ITEM_HEIGHT = 48;

type Props = {
  onSetTitle: Function,
  onSetCurrentLecture: Function,
  onSetBackToTeacherDashboard: Function,
  lecture: any,
  additionalInfo: any,
  currentLecture: any
};
type State = {
  anchorEl: any,
  currentData: any
};

class TeacherCard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      anchorEl: null,
      currentData: {
        lecture: this.props.lecture,
        additionalInfo: this.props.additionalInfo
      }
    };
  }
  // functions for settings dropdown
  handleClick = (event: any) => {
    this.setState({ anchorEl: event.currentTarget });
  };
  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  // card functions
  cardAction = () => {
    this.props.onSetBackToTeacherDashboard(true);
    this.props.onSetTitle(this.state.currentData.lecture.title);
    this.props.onSetCurrentLecture(this.state.currentData);
  };

  render() {
    const { lecture, additionalInfo } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className="teacher-card">
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
          </CardContent>
          <CardActions className="card-actions">
            <ul className="teacher-card-action">
              <li>
                {additionalInfo.applicationscount ? (
                  <Button
                    size="medium"
                    component={Link}
                    to="/class"
                    onClick={this.cardAction}
                  >
                    <em>{additionalInfo.applicationscount}</em>
                    Записалось
                  </Button>
                ) : null}
              </li>
              <li>
                {additionalInfo.participantscount ? (
                  <Button
                    size="medium"
                    component={Link}
                    to="/class#1"
                    onClick={this.cardAction}
                  >
                    <em>{additionalInfo.participantscount}</em>
                    Приняты
                  </Button>
                ) : null}
              </li>
            </ul>
          </CardActions>
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentLecture: state.lectures.currentLecture
  };
}

const mapDispatchToProps = dispatch => ({
  onSetCurrentLecture(val) {
    dispatch(setCurrentLecture(val));
  },
  onSetTitle(val) {
    dispatch(setTitle(val));
  },
  onSetBackToTeacherDashboard(val) {
    dispatch(setBackToTeacherDashboard(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(TeacherCard);
