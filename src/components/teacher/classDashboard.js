// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Tabs, { Tab } from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';
import List from 'material-ui/List';
//
import Header from '../header/header';
import ApplicationsItem from './applicationsItem';
import ParticipantsItem from './participantsItem';
//
import getUserFaucetApi from '../api/getUserFaucetApi';
import { setParticipants, setApplications } from '../../actions/lecturesAction';
//
import './teacher.css';

type Props = {
  getUserFaucetApi: Function,
  onSetParticipants: Function,
  onSetApplications: Function,
  currentLecture: any,
  participants: any,
  applications: any
};
type State = {
  value: number,
  loaderFlag: boolean,
  loaderParticipantsFlag: boolean
};

class ClassDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let url = window.location.href.split('/')[3];
    switch (url) {
      case 'class':
        this.state = {
          value: 0,
          loaderFlag: true,
          loaderParticipantsFlag: true
        };
        break;
      case 'class#1':
        this.state = {
          value: 1,
          loaderFlag: true,
          loaderParticipantsFlag: true
        };
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    if (!this.props.participants.length) {
      let usersData = [];
      if (this.props.currentLecture.additionalInfo.participants.length) {
        let n = this.props.currentLecture.additionalInfo.participants.length;
        for (let i of this.props.currentLecture.additionalInfo.participants) {
          getUserFaucetApi(i.name)
            .then(resp => {
              usersData.push(resp);
              n--;
              if (!n) {
                this.props.onSetParticipants(usersData);
                usersData.length
                  ? this.setState({ loaderParticipantsFlag: false })
                  : this.setState({ loaderParticipantsFlag: true });
              }
            })
            .catch(error => alert(error));
        }
      } else {
        this.setState({ loaderParticipantsFlag: false });
      }
    }
    if (!this.props.applications.length) {
      let usersData = [];
      if (this.props.currentLecture.additionalInfo.applications.length) {
        let n = this.props.currentLecture.additionalInfo.applications.length;
        for (let i of this.props.currentLecture.additionalInfo.applications) {
          getUserFaucetApi(i.account.name)
            .then(resp => {
              usersData.push({
                userData: resp,
                studentId: i.id
              });
              n--;
              if (!n) {
                this.props.onSetApplications(usersData);
                usersData.length
                  ? this.setState({ loaderFlag: false })
                  : this.setState({ loaderFlag: true });
              }
            })
            .catch(error => alert(error));
        }
      } else {
        this.setState({ loaderFlag: false });
      }
    }
  }
  handleTabChange = (event: any, value: number) => {
    this.setState({ value });
  };

  render() {
    const { value, loaderFlag, loaderParticipantsFlag } = this.state;
    const { currentLecture, participants, applications } = this.props;
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
                ) : applications.length ? (
                  <List className="list-wrap">
                    {applications.map((application, index) => (
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
                ) : participants.length ? (
                  <List className="list-wrap">
                    {participants.map((participant, index) => (
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
