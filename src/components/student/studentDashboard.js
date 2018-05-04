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
    let studentCardItems = 0;
    let lectureCardItems = 0;
    return (
      <div className="tabs-wrap">
        <Tabs
          value={value}
          onChange={this.handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          className="shadow"
        >
          <Tab label="Возможныe" className="tab" />
          <Tab label="Мои" className="tab" />
        </Tabs>
        <div className="tab-container">
          {value === 0 ? (
            <TabContainer>
              {lecturesBTS.map((lectures, index) => {
                !lectures.state.ticket.accepted ? lectureCardItems++ : null;
                return !lectures.state.ticket.accepted ? (
                  <LectureCard {...lectures} key={index} />
                ) : null;
              })}
              {!lectureCardItems ? (
                <p>Вы зарегистрировались на все лекции.</p>
              ) : null}
            </TabContainer>
          ) : null}
          {value === 1 ? (
            <TabContainer>
              {lecturesBTS.map((lectures, index) => {
                lectures.state.ticket.accepted ? studentCardItems++ : null;
                return lectures.state.ticket.accepted ? (
                  <StudentCard {...lectures} key={index} />
                ) : null;
              })}
              {!studentCardItems ? (
                <p>У Вас нет лекций! Зарегистрируйтесь на одну из лекций.</p>
              ) : null}
            </TabContainer>
          ) : null}
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
