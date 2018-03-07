import React from 'react';
import { ListItem, ListItemSecondaryAction, ListItemText } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import ImageIcon from 'material-ui-icons/Image';
import AssignmentTurnedIn from 'material-ui-icons/AssignmentTurnedIn';
import AssignmentInd from 'material-ui-icons/AssignmentInd';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({
    grey: {
        color: '#bbb'
    }
});

const Student = (props) => {
    
        return (
            <ListItem id={props.classes.id}>
                <Avatar>
                    <ImageIcon />
                </Avatar>
                <ListItemText primary={props.name} secondary={props.faculty} />
                <ListItemSecondaryAction>
                    <AssignmentInd className={props.classes.grey} />
                    <AssignmentTurnedIn className={props.classes.grey} />
                </ListItemSecondaryAction>
            </ListItem>
        );

}

export default withStyles(styles)(Student)