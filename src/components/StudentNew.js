import React from 'react';
import {
  ListItem,
  ListItemSecondaryAction,
  ListItemText
} from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';

const Student = props => {
  return (
    <ListItem id={props.id}>
      <Avatar>
        <i className="material-icons">add_a_photo</i>
      </Avatar>
      <ListItemText primary={props.name} secondary={props.faculty} />
      <ListItemSecondaryAction>
        <Checkbox />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default Student;
