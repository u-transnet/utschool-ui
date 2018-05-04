// @flow

import * as React from 'react';
import Card, { CardHeader, CardActions, CardContent } from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
//
import './student.css';

const MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3'];
const ITEM_HEIGHT = 48;

type Props = {
  lecture: any,
  state: any
};
type State = {
  anchorEl: any
};

export default class StudentCard extends React.Component<Props, State> {
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
    const { lecture, state } = this.props;
    const { anchorEl } = this.state;
    return (
      <div className="student-card">
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
            <ul className="lecture-status">
              {state.ticket.accepted ? (
                <li>
                  <i className="material-icons">check_circle</i>
                  <span>Записан</span>
                </li>
              ) : (
                ''
              )}
              {state.settion.accepted ? (
                <li>
                  <i className="material-icons">check_circle</i>
                  <span>Пришел</span>
                </li>
              ) : (
                ''
              )}
              {state.grade.accepted ? (
                <li>
                  <i className="material-icons">check_circle</i>
                  <span>Сдан</span>
                </li>
              ) : (
                ''
              )}
            </ul>
          </CardActions>
        </Card>
      </div>
    );
  }
}
