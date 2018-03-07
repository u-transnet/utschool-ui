import React from 'react';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Checkbox from 'material-ui/Checkbox';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';

const Student = (props) => {

        return (
            <ListItem id={props.id}>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText primary={props.name} secondary={props.faculty} />
                <ListItemSecondaryAction>
                    <Checkbox />
                </ListItemSecondaryAction>
            </ListItem>
        );

}

export default Student