// @flow

import * as React from 'react';
import { connect } from 'react-redux';
//
import Tabs, { Tab } from 'material-ui/Tabs';
import { CircularProgress } from 'material-ui/Progress';
//
import getLectureFaucetApi from '../api/getLectureFaucetApi';
import getLectureDataApi from '../api/getLectureDataApi';
import LectureCard from '../lectures/lectureCard';
import StudentCard from './studentCard';
import { setLectures } from '../../actions/lecturesAction';
import './student.css';
//

type Props = {
  apiInit: Object,
  onSetLectures: Function,
  lecturesBTS: any
};
type State = {
  value: number,
  lecturesArray: Array<any>,
  loaderFlag: boolean
};

class DashboardStudentContent extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: 0,
      loaderFlag: true,
      lecturesArray: this.props.lecturesBTS
    };

    setTimeout(() => {
      if (!this.state.lecturesArray.length) {
        // get lectures data from bitfares
        let lecturesData = [];
        this.props.apiInit.studentApi.getLectures().then(resp => {
          let lectureBTSData = [];
          let accounts = '';
          for (let i of resp) {
            lectureBTSData.unshift({
              ticket: {
                accepted: i.stats['1.3.3347'].accepted,
                requested: i.stats['1.3.3347'].requested,
                balance: i.stats['1.3.3347'].balance
              },
              settion: {
                accepted: i.stats['1.3.3348'].accepted,
                requested: i.stats['1.3.3348'].requested,
                balance: i.stats['1.3.3348'].balance
              },
              grade: {
                accepted: i.stats['1.3.3349'].accepted,
                balance: i.stats['1.3.3349'].balance
              }
            });
            accounts = accounts + i.name + ',';
          }
          accounts = accounts.slice(0, -1);
          // get lecture data from faucet
          getLectureFaucetApi(accounts).then(resp => {
            let n = 0;
            let j = resp.length;
            for (let i of resp) {
              //get lecture data from vk
              getLectureDataApi(i.topic_url, i.account_name).then(resp => {
                lecturesData.push({
                  lecture: resp,
                  state: lectureBTSData[n]
                });
                n++;
                if (n === j) {
                  // save lectire data to store
                  this.setState({ lecturesArray: lecturesData });
                  this.props.onSetLectures(lecturesData);
                  // remove waiting loader
                  this.setState({ loaderFlag: false });
                }
              });
            }
          });
        });
      } else {
        this.setState({ loaderFlag: false });
      }
    }, 10);
  }

  handleTabChange = (event: any, value: number) => {
    this.setState({ value });
  };

  render() {
    const { value, lecturesArray, loaderFlag } = this.state;
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
              {loaderFlag ? (
                <CircularProgress className="centered-loader" size={50} />
              ) : (
                <div>
                  {lecturesArray.map((lectures, index) => {
                    !lectures.state.ticket.accepted ? lectureCardItems++ : null;
                    return !lectures.state.ticket.accepted ? (
                      <LectureCard {...lectures} key={index} />
                    ) : null;
                  })}
                  {!lectureCardItems ? (
                    <p>Вы зарегистрировались на все лекции.</p>
                  ) : null}
                </div>
              )}
            </TabContainer>
          ) : null}
          {value === 1 ? (
            <TabContainer>
              {loaderFlag ? (
                <CircularProgress className="centered-loader" size={50} />
              ) : (
                <div>
                  {lecturesArray.map((lectures, index) => {
                    lectures.state.ticket.accepted ? studentCardItems++ : null;
                    return lectures.state.ticket.accepted ? (
                      <StudentCard {...lectures} key={index} />
                    ) : null;
                  })}
                  {!studentCardItems ? (
                    <p>
                      У Вас нет лекций! Зарегистрируйтесь на одну из лекций.
                    </p>
                  ) : null}
                </div>
              )}
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
    apiInit: state.app.apiInit,
    lecturesBTS: state.lectures.lecturesBTS
  };
}

const mapDispatchToProps = dispatch => ({
  onSetLectures(val) {
    dispatch(setLectures(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardStudentContent
);
