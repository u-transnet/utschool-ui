import React from 'react';
import { connect } from 'react-redux';
import { openDrawer, closeDrawer, toggleStatus } from '../actions';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import IconButton from 'material-ui/IconButton';
import Card, { CardContent } from 'material-ui/Card';
import Search from 'material-ui-icons/Search';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import ExpansionPanel, {
  ExpansionPanelDetails,
  ExpansionPanelSummary
} from 'material-ui/ExpansionPanel';
import { FormControlLabel } from 'material-ui/Form';
import FormSwitch from 'material-ui/Switch';
import Avatar from 'material-ui/Avatar';

import avatarIco from '../assets/avatar.png';
import MenuIcon from 'material-ui-icons/Menu';
import MoreVert from 'material-ui-icons/MoreVert';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';
import HelpIcon from 'material-ui-icons/Help';
import SettingsIcon from 'material-ui-icons/Settings';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import ChromeReaderModeIcon from 'material-ui-icons/ChromeReaderMode';
import DescriptionIcon from 'material-ui-icons/Description';

const styles = theme => ({
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  flex: {
    flex: 1
  },
  rotate: {
    transform: 'rotate(180deg)'
  },
  drawer__list: {
    minWidth: 300
  },
  card: {
    backgroundColor: theme.palette.primary.main,
    height: 145,
    boxShadow: 'none'
  },
  card__avatar: {
    width: 62,
    height: 62
  },
  card__user: {
    color: '#fff',
    marginTop: 30
  },
  card__userType: {
    color: '#eee'
  },
  panel: {
    marginTop: 0,
    backgroundColor: theme.palette.primary.main
  },
  white: {
    color: '#fff'
  }
});

const Header = props => {
  const toggleStatus = event => {
    props.onToggleStatus(props.userStatus);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            className={props.classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={props.onOpenDrawer}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="title"
            color="inherit"
            className={props.classes.flex}
          >
            {props.title}
          </Typography>
          <Search />
          <MoreVert />
        </Toolbar>
      </AppBar>

      <Drawer open={props.drawer} onClose={props.onCloseDrawer}>
        <div tabIndex={0} role="button" onKeyDown={props.onCloseDrawer}>
          <Card className={props.classes.card}>
            <CardContent>
              <Avatar
                alt="Logo"
                src={avatarIco}
                className={props.classes.card__avatar}
              />
              <Typography variant="title" className={props.classes.card__user}>
                {props.userName ? props.userName : 'Гость'}
              </Typography>
            </CardContent>
          </Card>

          <ExpansionPanel className={props.classes.panel}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon className={props.classes.white} />}
            >
              <Typography
                variant="caption"
                className={props.classes.card__userType}
              >
                {props.userStatus === 'on' ? 'Преподаватель' : 'Студент'}
              </Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div />
              <div>
                <FormControlLabel
                  control={
                    <FormSwitch
                      onChange={toggleStatus}
                      color="primary"
                      value={props.userStatus}
                    />
                  }
                  label="Тип пользователя"
                />
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>

          <List className={props.classes.drawer__list}>
            <ListItem
              button
              component={Link}
              to="/dashboard-student"
              onClick={props.onCloseDrawer}
            >
              <ListItemIcon>
                <DescriptionIcon />
              </ListItemIcon>
              <ListItemText primary="Мои лекции" />
            </ListItem>

            {props.userStatus === 'on' ? (
              <ListItem
                button
                component={Link}
                to="/dashboard-teacher"
                onClick={props.onCloseDrawer}
              >
                <ListItemIcon>
                  <ChromeReaderModeIcon />
                </ListItemIcon>
                <ListItemText primary="Лекции" />
              </ListItem>
            ) : (
              false
            )}

            <Divider />

            <ListItem
              button
              component={Link}
              to="/profile"
              onClick={props.onCloseDrawer}
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
              onClick={props.onCloseDrawer}
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
              onClick={props.onCloseDrawer}
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
              onClick={props.onCloseDrawer}
            >
              <ListItemIcon>
                <ExitToAppIcon className={props.classes.rotate} />
              </ListItemIcon>
              <ListItemText primary="Выйти" />
            </ListItem>
          </List>
        </div>
      </Drawer>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    title: state.app.title,
    drawer: state.app.drawer,
    userName: state.user.userName,
    userStatus: state.user.userStatus
  };
}

const mapDispatchToProps = dispatch => ({
  onOpenDrawer() {
    dispatch(openDrawer());
  },
  onCloseDrawer() {
    dispatch(closeDrawer());
  },
  onToggleStatus(val) {
    dispatch(toggleStatus(val));
  }
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(Header)
);
