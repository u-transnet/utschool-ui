// @flow
import { Action } from 'redux';
import { SET_LECTURES, SET_TEACHER_LECTURES } from '../actions/lecturesAction';

type State = {
  lecturesBTS: any,
  teacherLectures: any
};

const initialState: State = {
  lecturesBTS: [],
  teacherLectures: []
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
    default:
      return state;
  }
}
