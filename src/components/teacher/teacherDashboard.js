// @flow
import * as React from 'react';
import { connect } from 'react-redux';
//
import { CircularProgress } from 'material-ui/Progress';
//
import getLectureFaucetApi from '../api/getLectureFaucetApi';
import getLectureDataApi from '../api/getLectureDataApi';
//
import { setTeacherLectures } from '../../actions/lecturesAction';
//
import TeacherCard from './teacherCard';
//
import './teacher.css';

type Props = {
  onSetTeacherLectures: Function,
  account: string,
  teacherLectures: any,
  apiInit: any
};
type State = {
  loaderFlag: boolean,
  nodata: string
};

class DashboardTeacherContent extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      loaderFlag: true,
      nodata: ''
    };
  }
  componentDidMount() {
    if (!this.props.teacherLectures.length) {
      this.getTeacherLections();
    } else {
      this.setState({ loaderFlag: false });
    }
  }

  // get teacher lections
  getTeacherLections() {
    // get teacher lectures from bitshares
    this.props.apiInit.teacherApi
      .getLectures()
      .then(resp => {
        if (resp.length) {
          let dataArray = this.reformatLecturesData(resp);
          let lectureAccounts = this.stringAccoutns(dataArray);
          lectureAccounts
            ? getLectureFaucetApi(lectureAccounts).then(resp => {
                let lecturesData = [];
                // TODO need clean after change fauset
                if (resp.length) {
                  let n = 0;
                  for (let i of resp) {
                    // get data for current lecture from vk
                    getLectureDataApi(i.topic_url, i.name)
                      .then(resp => {
                        lecturesData.push({
                          lecture: resp,
                          additionalInfo: dataArray[n]
                        });
                        // desable loader
                        lecturesData.length
                          ? this.setState({ loaderFlag: false })
                          : this.setState({ loaderFlag: true });
                        // save data about teacher lectures to store
                        this.props.onSetTeacherLectures(lecturesData);
                        n++;
                      })
                      .catch(error => error);
                  }
                }
              })
            : null;
        } else {
          this.setState({ loaderFlag: false });
          this.setState({ nodata: 'У вас нет лекций.' });
        }
      })
      .catch(error => error);
  }
  // reformat data for teacher lectures
  reformatLecturesData = data => {
    let array = [];
    if (data.length) {
      for (let i of data) {
        array.push({
          account: i.name,
          applications: i.applications,
          applicationscount: i.applications.length,
          participants: i.participants,
          participantscount: i.participants.length
        });
      }
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

  render() {
    const { teacherLectures } = this.props;
    const { loaderFlag, nodata } = this.state;
    return (
      <div className="content-wrap">
        {loaderFlag ? (
          <CircularProgress className="centered-loader" size={50} />
        ) : (
          <div>
            {nodata ? <p className="empty-block">{nodata}</p> : null}
            {teacherLectures.map((lectures, index) => (
              <TeacherCard {...lectures} key={index} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    account: state.user.account,
    apiInit: state.app.apiInit,
    teacherLectures: state.lectures.teacherLectures
  };
}

const mapDispatchToProps = dispatch => ({
  onSetTeacherLectures(val) {
    dispatch(setTeacherLectures(val));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(
  DashboardTeacherContent
);
