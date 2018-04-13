// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import userStore from '../../stores/usersTempData';
import userInfo from '../getUserData';
import Header from '../header/header';
import DashboardStudentContent from '../student/studentDashboard';
import currentUser from '../../stores/userTempData';

type Props = {
  account: string,
  role: string
};
type State = {
  userData: any
};

class Dashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      userData: currentUser
    };
  }
  render() {
    const { userData } = this.state;
    return (
      <div>
        <Header title="Мои лекции" />
        {userData.role === 'Студент' ? (
          <DashboardStudentContent />
        ) : (
          <h1>Dashboard {userData.name}</h1>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.user.account
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
