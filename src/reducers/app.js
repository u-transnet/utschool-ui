// @flow
import { Action } from 'redux';
import { SET_TITLE, BACK_TO_TEACHER_DASHBOARD } from '../actions/index';

type State = {
  title: string,
  backToTeacherDashboard: boolean
};

const initialState: State = {
  title: 'UT-SCHOOL',
  backToTeacherDashboard: false
};

export default function theApp(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case SET_TITLE:
      return Object.assign({}, state, {
        title: action.title
      });
    case BACK_TO_TEACHER_DASHBOARD:
      return Object.assign({}, state, {
        backToTeacherDashboard: action.backToTeacherDashboard
      });
    default:
      return state;
  }
}
