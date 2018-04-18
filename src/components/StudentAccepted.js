import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
  grey: {
    color: '#bbb'
  }
});

const Student = props => {
  return (
    <ListItem id={props.classes.id}>
      <Avatar>
        <i className="material-icons">add_a_photo</i>
      </Avatar>
      <ListItemText primary={props.name} secondary={props.faculty} />
      <ListItemSecondaryAction>
        <i className="material-icons">assignment_ind</i>
        <i class="material-icons">assignment_returned</i>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(Student);
