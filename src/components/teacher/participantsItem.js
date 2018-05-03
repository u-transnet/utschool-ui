// @flow
import * as React from 'react';
import { connect } from 'react-redux';
//
import Avatar from 'material-ui/Avatar';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
//
import './teacher.css';

type Props = {
  photo: string,
  first_name: string,
  last_name: string
};
type State = {};

class ParticipantsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  render() {
    //const {  } = this.state;
    const { photo, first_name, last_name } = this.props;
    let userName = first_name + ' ' + last_name;
    return (
      <ListItem>
        <Avatar alt={userName} src={photo} />
        <ListItemText primary={userName} secondary="Студент" />
        <ListItemSecondaryAction>
          <IconButton>
            <i className="material-icons">assignment_ind</i>
          </IconButton>
          <IconButton>
            <i className="material-icons">assignment_turned_in</i>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

function mapStateToProps(state) {
  return {
    // account: state.user.account,
    // lecturesBTS: state.lectures.lecturesBTS
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ParticipantsItem);
