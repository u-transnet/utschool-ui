// @flow
import { Action } from 'redux';
import {
  SET_LECTURES,
  SET_TEACHER_LECTURES,
  SET_PARTICIPANTS,
  SET_APPLICATIONS,
  SET_CURRENT_LECTURE
} from '../actions/lecturesAction';

type State = {
  lecturesBTS: any,
  teacherLectures: any,
  participants: any,
  currentLecture: any,
  applications: any
};

const initialState: State = {
  lecturesBTS: [],
  teacherLectures: [],
  participants: [],
  currentLecture: [],
  applications: []
};

export default function theApp(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case SET_LECTURES:
      return Object.assign({}, state, {
        lecturesBTS: action.lecturesBTS
      });
    case SET_TEACHER_LECTURES:
      return Object.assign({}, state, {
        teacherLectures: action.teacherLectures
      });
    case SET_PARTICIPANTS:
      return Object.assign({}, state, {
        participants: action.participants
      });
    case SET_APPLICATIONS:
      return Object.assign({}, state, {
        applications: action.applications
      });
    case SET_CURRENT_LECTURE:
      return Object.assign({}, state, {
        currentLecture: action.currentLecture
      });
    default:
      return state;
  }
}
