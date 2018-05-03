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
import Checkbox from 'material-ui/Checkbox';
//
import './teacher.css';

type Props = {
  photo: string,
  first_name: string,
  last_name: string
};
type State = {};

class ApplicationsItem extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }
  handleToggle = () => {
    //console.log('check');
  };
  render() {
    //const {} = this.state;
    const { photo, first_name, last_name } = this.props;
    let userName = first_name + ' ' + last_name;
    return (
      <ListItem>
        <Avatar alt={userName} src={photo} />
        <ListItemText primary={userName} secondary="Студент" />
        <ListItemSecondaryAction>
          <Checkbox color="primary" onChange={this.handleToggle} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationsItem);
