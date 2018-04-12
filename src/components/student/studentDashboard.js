// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Tabs, { Tab } from 'material-ui/Tabs';
//
import './student.css';

import StudentClassCard from '../StudentClassCard';
import allClasses from '../../stores/classesTempData';

type Props = {};
type State = {
  value: number
};
// TODO need clean
const TabContainer = props => {
  return <div>{[props.children]}</div>;
};

let classesNew = allClasses.filter(function(theClass) {
  return theClass['accepted'] === 'false';
});

const classesList = classesNew.map((classes, index) => {
  return <StudentClassCard {...classes} key={index} />;
});

let classesAccepted = allClasses.filter(function(theClass) {
  return theClass['accepted'] === 'true';
});

const acceptedClassesList = classesAccepted.map((classes, index) => {
  return <StudentClassCard {...classes} key={index} />;
});
// end of TODO

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
    return (
      <div className="tabs-wrap">
        <Tabs value={value} onChange={this.handleTabChange}>
          <Tab label="Возможныe" className="tab" />
          <Tab label="Мои" className="tab" />
        </Tabs>
        <div className="tab-container">
          {value === 0 && <TabContainer>{classesList}</TabContainer>}
          {value === 1 && <TabContainer>{acceptedClassesList}</TabContainer>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {}

const mapDispatchToProps = dispatch => ({});

// export default connect(mapStateToProps, mapDispatchToProps)(
//   DashboardStudentContent
// );

export default DashboardStudentContent;
