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
      let lecturesData = [];
      // get teacher lectures from bitshares
      this.props.apiInit.teacherApi
        .getLectures()
        .then(resp => {
          if (resp.length) {
            for (let i of resp) {
              // info about applications & participants for current lection
              let additionalInfo = {
                applications: i.applications,
                applicationscount: i.applications.length,
                participants: i.participants,
                participantscount: i.participants.length
              };
              // get data for current lecture from faucet
              getLectureFaucetApi(i.name)
                .then(resp => {
                  // get data for current lecture from vk
                  getLectureDataApi(resp.topic_url, i.name)
                    .then(resp => {
                      lecturesData.push({
                        lecture: resp,
                        additionalInfo: additionalInfo
                      });
                      // desable loader
                      lecturesData.length
                        ? this.setState({ loaderFlag: false })
                        : this.setState({ loaderFlag: true });
                      // save data about teacher lectures to store
                      this.props.onSetTeacherLectures(lecturesData);
                    })
                    .catch(error => error);
                })
                .catch(error => error);
            }
          } else {
            this.setState({ loaderFlag: false });
            this.setState({ nodata: 'У вас нет лекций.' });
          }
        })
        .catch(error => error);
    } else {
      this.setState({ loaderFlag: false });
    }
  }
  render() {
    const { teacherLectures } = this.props;
    const { loaderFlag, nodata } = this.state;
    return (
      <div>
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
