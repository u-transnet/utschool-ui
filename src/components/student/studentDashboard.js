// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Tabs, { Tab } from 'material-ui/Tabs';
//
import StudentCard from './studentCard';
import './student.css';
//
import allLectures from '../../stores/lecturesTempData';

type Props = {};
type State = {
  value: number
};

class DashboardStudentContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleTabChange = (event: any, value: number) => {
    this.setState({ value });
  };

  render() {
    const { value } = this.state;

    const TabContainer = props => {
      return <div>{[props.children]}</div>;
    };
    let lecturesNew = allLectures.filter(function(theLecture) {
      //return theLecture['accepted'] === 'false';
    });
    let lecturesAccepted = allLectures.filter(function(theLecture) {
      //return theLecture['accepted'] === 'true';
    });

    return (
      <div className="tabs-wrap">
        <Tabs value={value} onChange={this.handleTabChange}>
          <Tab label="Возможныe" className="tab" />
          <Tab label="Мои" className="tab" />
        </Tabs>
        <div className="tab-container">
          {value === 0 && (
            <TabContainer>
              {lecturesNew.map((lectures, index) => (
                <StudentCard {...lectures} key={index} />
              ))}
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              {lecturesAccepted.map((lectures, index) => (
                <StudentCard {...lectures} key={index} />
              ))}
            </TabContainer>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardStudentContent
);
