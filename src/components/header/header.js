// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Menu, { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Card, { CardContent } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
//
import { setUserRole } from '../../actions/actionsUser';
import { setTitle } from '../../actions';
//
import './header.css';

//types
type Props = {
  onChangeRole: Function,
  onChangeTitle: Function,
  title: string,
  account: string,
  lastName: string,
  firstName: string,
  avatar: string,
  role: string
};
type State = {
  anchorEl: any,
  openMenu: boolean,
  name: string
};

//CONSTS
const TOOLBAR_MENU_OPTIONS = ['Option 1', 'Option 2', 'Option 3', 'Option 4'];
const ITEM_HEIGHT = 48;

class Header extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      openMenu: false,
      anchorEl: null,
      name: this.props.firstName + ' ' + this.props.lastName
    };
  }

  // toolbar menu functions
  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  // end off toolbar menu functions
  menuOpener = () => this.setState({ openMenu: !this.state.openMenu });

  handleChange = event => {
    this.props.onChangeRole(event.target.value);
    event.target.value === 'Студент'
      ? this.props.onChangeTitle('Лекции')
      : this.props.onChangeTitle('Мои Лекции');
  };

  render() {
    const { anchorEl, name, openMenu } = this.state;
    const { role, avatar } = this.props;
    return (
      <div className="header">
        {/* top bar */}
        <AppBar position="fixed" className="white-bg" color="default">
          <Toolbar>
            <IconButton
              className="menu-button"
              color="inherit"
              aria-label="Menu"
              onClick={this.menuOpener}
            >
              <i className="material-icons">menu</i>
            </IconButton>
            <Typography variant="title" color="inherit" className="flex">
              {this.props.title}
            </Typography>
            <div className="toolbar-dd">
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
                {TOOLBAR_MENU_OPTIONS.map(option => (
                  <MenuItem key={option} onClick={this.handleClose}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </Toolbar>
        </AppBar>
        {/* sidebar */}
        <Drawer className="sidebar" open={openMenu} onClose={this.menuOpener}>
          <div
            className="sidebar-inner"
            tabIndex={0}
            role="button"
            onKeyDown={this.menuOpener}
          >
            <Card className="card">
              <CardContent>
                <Avatar alt="Logo" src={avatar} className="card-avatar" />
                <div className="user-title">
                  <span>{name}</span>
                  <Select
                    value={role}
                    onChange={this.handleChange}
                    className="role-select"
                  >
                    <MenuItem value={'Студент'}>Студент</MenuItem>
                    <MenuItem value={'Преподаватель'}>Преподаватель</MenuItem>
                  </Select>
                </div>
              </CardContent>
            </Card>
            <List className="drawer-list">
              {role === 'Студент' ? (
                <ListItem
                  button
                  component={Link}
                  to="/dashboard"
                  onClick={this.menuOpener}
                >
                  <ListItemIcon>
                    <i className="material-icons">chrome_reader_mode</i>
                  </ListItemIcon>
                  <ListItemText primary="Лекции" />
                </ListItem>
              ) : (
                <ListItem
                  button
                  component={Link}
                  to="/dashboard"
                  onClick={this.menuOpener}
                >
                  <ListItemIcon>
                    <i className="material-icons">description</i>
                  </ListItemIcon>
                  <ListItemText primary="Мои лекции" />
                </ListItem>
              )}
              <ListItem
                button
                component={Link}
                to="/profile"
                onClick={this.menuOpener}
              >
                <ListItemIcon>
                  <i className="material-icons">account_circle</i>
                </ListItemIcon>
                <ListItemText primary="Мой профиль" />
              </ListItem>
              <Divider />
              <ListItem
                button
                component={Link}
                to="/settings"
                onClick={this.menuOpener}
              >
                <ListItemIcon>
                  <i className="material-icons">settings</i>
                </ListItemIcon>
                <ListItemText primary="Настройки" />
              </ListItem>
              <ListItem
                button
                component={Link}
                to="/help"
                onClick={this.menuOpener}
              >
                <ListItemIcon>
                  <i className="material-icons">help</i>
                </ListItemIcon>
                <ListItemText primary="Помощь" />
              </ListItem>
              <Divider />
              <ListItem
                button
                component={Link}
                to="/"
                onClick={this.menuOpener}
              >
                <ListItemIcon>
                  <i className="material-icons rotate">exit_to_app</i>
                </ListItemIcon>
                <ListItemText primary="Выйти" />
              </ListItem>
            </List>
          </div>
        </Drawer>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    title: state.app.title,
    account: state.user.account,
    avatar: state.user.avatar,
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    role: state.user.role
  };
}

const mapDispatchToProps = dispatch => ({
  onChangeRole(val) {
    dispatch(setUserRole(val));
  },
  onChangeTitle(val) {
    dispatch(setTitle(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
