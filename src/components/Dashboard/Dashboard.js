// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Header from '../Header';
//

type Props = {
  account: string
};
type State = {};

class Dashboard extends React.Component<Props, State> {
  render() {
    return (
      <div>
        <Header title="Мои лекции" />
        <h1>Dashboard {this.props.account}</h1>
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
