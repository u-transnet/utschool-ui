import React from 'react';
import { connect } from 'react-redux';
import { withStyles } from 'material-ui/styles';
import Tabs, { Tab } from 'material-ui/Tabs';
import StudentNew from './StudentNew';
import StudentAccepted from './StudentAccepted';
import studentsList from '../stores/usersTempData';

const styles = theme => ({
  tab: {
    flexGrow: 1,
    backgroundColor: theme.palette.primary.main,
    opacity: 1,
    color: '#fff'
  },
  tab__container: {
    padding: 10,
    listStyle: 'none'
  }
});

const tab__container_ = {
  padding: 10,
  listStyle: 'none'
};

const TabContainer = props => {
  return <div style={tab__container_}>{[props.children]}</div>;
};

let studentsNew = studentsList.filter(function(student) {
  return student['accepted'] === 'false';
});

let studentsAcceptedList = studentsList.filter(function(student) {
  return student['accepted'] === 'true';
});

const students = studentsNew.map((student, index) => {
  return <StudentNew {...student} key={index} />;
});

const studentsAccepted = studentsAcceptedList.map((studentAcc, index) => {
  return <StudentAccepted {...studentAcc} key={index} />;
});

const TeacherClassApplicants = props => {
  return (
    <div>
      <Tabs value={props.studentTab} onChange={props.onToggleTab}>
        <Tab label="Новые" className={props.classes.tab} />
        <Tab label="Принятые" className={props.classes.tab} />
      </Tabs>
      {props.studentTab === 0 && <TabContainer>{students}</TabContainer>}
      {props.studentTab === 1 && (
        <TabContainer>{studentsAccepted}</TabContainer>
      )}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    studentTab: state.student.studentTab
  };
}

const mapDispatchToProps = dispatch => ({
  onToggleTab(event, value) {}
});

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(TeacherClassApplicants)
);
