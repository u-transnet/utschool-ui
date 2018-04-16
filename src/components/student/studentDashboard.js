// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Tabs, { Tab } from 'material-ui/Tabs';
//
import LectureCard from '../lectures/lectureCard';
import StudentCard from './studentCard';
import './student.css';
//

type Props = {
  lecturesBTS: any
};
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
    const { lecturesBTS } = this.props;
    const TabContainer = props => {
      return <div>{[props.children]}</div>;
    };

    return (
      <div className="tabs-wrap">
        <Tabs value={value} onChange={this.handleTabChange}>
          <Tab label="Возможныe" className="tab" />
          <Tab label="Мои" className="tab" />
        </Tabs>
        <div className="tab-container">
          {value === 0 && (
            <TabContainer>
              {lecturesBTS.map((lectures, index) => (
                <LectureCard {...lectures} key={index} />
              ))}
            </TabContainer>
          )}
          {value === 1 && (
            <TabContainer>
              {lecturesBTS.map((lectures, index) => (
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
    account: state.user.account,
    lecturesBTS: state.lectures.lecturesBTS
  };
}

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardStudentContent
);
