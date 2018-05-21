// @flow

import * as React from 'react';
import { connect } from 'react-redux';
import Tabs, { Tab } from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
//
import Header from '../header/header';
import ApplicationsItem from './applicationsItem';
import ParticipantsItem from './participantsItem';
import getUserFaucetApi from '../api/getUserFaucetApi';
import { setParticipants, setApplications } from '../../actions/lecturesAction';
//
import './teacher.css';

type Props = {
  apiInit: Object,
  onSetParticipants: Function,
  onSetApplications: Function,
  currentLecture: any,
  participants: any,
  applications: any
};
type State = {
  value: number,
  loaderFlag: boolean,
  loaderParticipantsFlag: boolean,
  dataParticipants: any,
  dataApplications: any
};

class ClassDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      loaderFlag: true,
      loaderParticipantsFlag: true,
      dataParticipants: this.props.participants,
      dataApplications: this.props.applications
    };
  }

  componentDidMount() {
    let url = window.location.href.split('/')[3];
    switch (url) {
      case 'class':
        this.setState({ value: 0 });
        break;
      case 'class#1':
        this.setState({ value: 1 });
        break;
      default:
        break;
    }
    // get data for showing participants
    if (!this.state.dataParticipants.length) {
      this.getLectureParticipants();
    } else {
      this.setState({ loaderParticipantsFlag: false });
    }
    // // get data for showing applications
    if (!this.state.dataApplications.length) {
      this.getLectureApplications();
    } else {
      this.setState({ loaderFlag: false });
    }
  }
  // get lecture applications from bitshares & faucet
  getLectureApplications = () => {
    this.props.apiInit.teacherApi.getLectureApplications
      ? this.props.apiInit.teacherApi
          .getLectureApplications(this.props.currentLecture.lecture.account)
          .then(resp => {
            let array = this.reformatLectureApplicationsUsersData(resp);
            let accounts = this.stringAccoutns(array);
            accounts
              ? getUserFaucetApi(accounts).then(resp => {
                  let dataArray = [];
                  for (let i of resp) {
                    for (let j of array) {
                      if (i.name === j.account) {
                        dataArray.unshift({
                          userData: {
                            name: i.name,
                            first_name: i.first_name,
                            last_name: i.last_name,
                            photo: i.photo
                          },
                          studentId: j.studentId
                        });
                      }
                    }
                  }
                  this.props.onSetApplications(dataArray);
                  this.setState({ dataApplications: dataArray });
                  this.setState({ loaderFlag: false });
                })
              : this.setState({ loaderFlag: false });
          })
      : this.setState({ loaderFlag: false });
  };
  // get lecture participants from bitshares & faucet
  getLectureParticipants = () => {
    this.props.apiInit.teacherApi.getLectureParticipants
      ? this.props.apiInit.teacherApi
          .getLectureParticipants(this.props.currentLecture.lecture.account)
          .then(resp => {
            let array = this.reformatLectureUsersData(resp);
            let accounts = this.stringAccoutns(array);
            accounts
              ? getUserFaucetApi(accounts).then(resp => {
                  let dataArray = [];
                  for (let i of resp) {
                    for (let j of array) {
                      if (i.name === j.account) {
                        dataArray.unshift({
                          name: i.name,
                          first_name: i.first_name,
                          last_name: i.last_name,
                          photo: i.photo,
                          session: j.session,
                          grade: j.grade
                        });
                      }
                    }
                  }
                  this.props.onSetParticipants(dataArray);
                  this.setState({ dataParticipants: dataArray });
                  this.setState({ loaderParticipantsFlag: false });
                })
              : this.setState({ loaderParticipantsFlag: false });
          })
      : this.setState({ loaderParticipantsFlag: false });
  };
  // reformat lecture users data
  reformatLectureUsersData = data => {
    let array = [];
    for (let i of data) {
      array.push({
        account: i.name,
        session: i.stats['1.3.3348'].accepted,
        grade: i.stats['1.3.3349'].accepted
      });
    }
    return array;
  };
  // reformat lecture applications users data
  reformatLectureApplicationsUsersData = data => {
    let array = [];
    for (let i of data) {
      array.push({
        studentId: i.id,
        account: i.account.name
      });
    }
    return array;
  };
  //string accounts
  stringAccoutns = array => {
    let accounts = '';
    for (let i of array) {
      accounts = accounts + i.account + ',';
    }
    accounts = accounts.slice(0, -1);
    return accounts;
  };

  // tabs function
  handleTabChange = (event: any, value: number) => {
    this.setState({ value });
  };

  render() {
    const {
      value,
      loaderFlag,
      loaderParticipantsFlag,
      dataParticipants,
      dataApplications
    } = this.state;
    const TabContainer = props => {
      return <div>{[props.children]}</div>;
    };
    return (
      <div>
        <Header />
        <div className="tabs-wrap">
          <Tabs
            value={value}
            onChange={this.handleTabChange}
            indicatorColor="primary"
            textColor="primary"
            className="shadow"
          >
            <Tab label="Новые" className="tab" />
            <Tab label="Принятые" className="tab" />
          </Tabs>
          <div className="tab-container">
            {value === 0 ? (
              <TabContainer>
                {loaderFlag ? (
                  <CircularProgress className="centered-loader" size={50} />
                ) : dataApplications.length ? (
                  <List className="list-wrap">
                    {dataApplications.map((application, index) => (
                      <ApplicationsItem {...application} key={index} />
                    ))}
                  </List>
                ) : (
                  <p className="empty-block">
                    Нет студентов ожидающих регистрацию
                  </p>
                )}
              </TabContainer>
            ) : null}
            {value === 1 ? (
              <TabContainer>
                {loaderParticipantsFlag ? (
                  <CircularProgress className="centered-loader" size={50} />
                ) : dataParticipants.length ? (
                  <List className="list-wrap">
                    {dataParticipants.map((participant, index) => (
                      <ParticipantsItem {...participant} key={index} />
                    ))}
                  </List>
                ) : (
                  <p className="empty-block">
                    Нет зарегистрированных студентов
                  </p>
                )}
              </TabContainer>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    apiInit: state.app.apiInit,
    currentLecture: state.lectures.currentLecture,
    participants: state.lectures.participants,
    applications: state.lectures.applications
  };
}

const mapDispatchToProps = dispatch => ({
  onSetParticipants(val) {
    dispatch(setParticipants(val));
  },
  onSetApplications(val) {
    dispatch(setApplications(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(ClassDashboard);
