// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Header from '../header/header';
import DashboardStudentContent from '../student/studentDashboard';

type Props = {
  firstName: string,
  lastName: string,
  role: string
};
type State = {
  name: string
};

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: this.props.firstName + ' ' + this.props.lastName
    };
  }
  componentDidMount() {
    //TODO получение лекций
  }
  render() {
    const { role } = this.props;
    const { name } = this.state;
    return (
      <div>
        <Header title="Мои лекции" />
        {role === 'Студент' ? (
          <DashboardStudentContent />
        ) : (
          <h1>Dashboard {name}</h1>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    firstName: state.user.firstName,
    lastName: state.user.lastName,
    role: state.user.role
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
