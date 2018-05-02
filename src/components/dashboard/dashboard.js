// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Header from '../header/header';
import DashboardStudentContent from '../student/studentDashboard';
import DashboardTeacherContent from '../teacher/teacherDashboard';

type Props = {
  role: string
};
type State = {};

class Dashboard extends React.Component<Props, State> {
  render() {
    const { role } = this.props;
    return (
      <div>
        <Header />
        {role === 'Студент' ? (
          <DashboardStudentContent />
        ) : (
          <DashboardTeacherContent />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    role: state.user.role
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
