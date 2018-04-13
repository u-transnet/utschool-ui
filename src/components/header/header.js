// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
//
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import MoreVert from 'material-ui-icons/MoreVert';
import Menu, { MenuItem } from 'material-ui/Menu';

import Card, { CardContent } from 'material-ui/Card';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import MenuIcon from 'material-ui-icons/Menu';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import HelpIcon from 'material-ui-icons/Help';
import SettingsIcon from 'material-ui-icons/Settings';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ChromeReaderModeIcon from 'material-ui-icons/ChromeReaderMode';
import DescriptionIcon from 'material-ui-icons/Description';
//
import userStore from '../../stores/usersTempData';
import userInfo from '../getUserData';
//
import './header.css';

//types
type Props = {
  title: string,
  account: string
};
type State = {
  anchorEl: any,
  userData: any,
  openMenu: boolean
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
      userData: userInfo(userStore, this.props.account)
    };
  }

  // toolbar menu functions
  handleClick = event => this.setState({ anchorEl: event.currentTarget });

  handleClose = () => this.setState({ anchorEl: null });

  // end off toolbar menu functions
  menuOpener = () => this.setState({ openMenu: !this.state.openMenu });

  render() {
    const { anchorEl, userData } = this.state;
    return (
      <div className="header">
        {/* top bar */}
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className="menu-button"
              color="inherit"
              aria-label="Menu"
              onClick={this.menuOpener}
            >
              <MenuIcon />
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
                <MoreVert />
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
        <Drawer
          className="sidebar"
          open={this.state.openMenu}
          onClose={this.menuOpener}
        >
          <div
            className="sidebar-inner"
            tabIndex={0}
            role="button"
            onKeyDown={this.menuOpener}
          >
            <Card className="card">
              <CardContent>
                <Avatar
                  alt="Logo"
                  src={userData.avatar}
                  className="card-avatar"
                />
                <div className="user-title">
                  <span>{userData.name}</span>
                  <em>{userData.role}</em>
                </div>
              </CardContent>
            </Card>
            <List className="drawer-list">
              <ListItem
                button
                component={Link}
                to="/dashboard"
                onClick={this.menuOpener}
              >
                <ListItemIcon>
                  <DescriptionIcon />
                </ListItemIcon>
                <ListItemText primary="Мои лекции" />
              </ListItem>

              {userData.role === 'Студент' ? (
                <ListItem
                  button
                  component={Link}
                  to="/dashboard"
                  onClick={this.menuOpener}
                >
                  <ListItemIcon>
                    <ChromeReaderModeIcon />
                  </ListItemIcon>
                  <ListItemText primary="Лекции" />
                </ListItem>
              ) : (
                false
              )}
              <ListItem
                button
                component={Link}
                to="/profile"
                onClick={this.menuOpener}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
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
                  <SettingsIcon />
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
                  <HelpIcon />
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
                  <ExitToAppIcon className="rotate" />
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
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
