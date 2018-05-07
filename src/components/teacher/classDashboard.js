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
import history from '../../history';
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
  loaderFlag: boolean
};

class ClassDashboard extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    let url = window.location.href.split('/')[3];
    switch (url) {
      case 'class':
        this.state = { value: 0, loaderFlag: true };
        break;
      case 'class#1':
        this.state = { value: 1, loaderFlag: true };
        break;
      default:
        break;
    }
  }

  componentDidMount() {
    if (!this.props.participants.length) {
      let usersData = [];
      let n = this.props.currentLecture.additionalInfo.participants.length;
      if (this.props.currentLecture.additionalInfo.participants.length) {
        console.log(this.props.currentLecture.additionalInfo.participants);
        for (let i of this.props.currentLecture.additionalInfo.participants) {
          getUserFaucetApi(i.name)
            .then(resp => {
              usersData.push(resp);
              n--;
              if (!n) {
                this.props.onSetParticipants(usersData);
                usersData.length
                  ? this.setState({ loaderFlag: false })
                  : this.setState({ loaderFlag: true });
              }
            })
            .catch(error => alert(error));
        }
      }
    } else {
      this.setState({ loaderFlag: false });
    }
    if (!this.props.applications.length) {
      let usersData = [];
      if (this.props.currentLecture.additionalInfo.applications.length) {
        let n = this.props.currentLecture.additionalInfo.applications.length;
        console.log(this.props.currentLecture.additionalInfo.applications);
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
      }
    } else {
      this.setState({ loaderFlag: false });
    }
  }

  handleTabChange = (event: any, value: number) => {
    this.setState({ value });
  };

  render() {
    const { value, loaderFlag } = this.state;
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
                {loaderFlag ? (
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
    // account: state.user.account,
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

// {ref_block_num: 11507, ref_block_prefix: 3593305144, expiration: "2018-05-04T13:14:30", operations: Array(1), extensions: Array(0), …}
// expiration
// :
// "2018-05-04T13:14:30"
// extensions
// :
// []
// operations
// :
// Array(1)
// 0
// :
// Array(2)
// 0
// :
// 23
// 1
// :
// {fee: {…}, fee_paying_account: "1.2.863957", proposal: "1.10.9864", active_approvals_to_add: Array(1), active_approvals_to_remove: Array(0), …}
// length
// :
// 2
// __proto__
// :
// Array(0)
// length
// :
// 1
// __proto__
// :
// Array(0)
// ref_block_num
// :
// 11507
// ref_block_prefix
// :
// 3593305144
// signatures
// :
// ["1f22669d447f20665405c0ece86f9f592e2b2de3ddb70e070a…4981a2bf645e42c287c249f11ad227f9d7983ee92e12671af"]
// __proto__
// :
// Object
