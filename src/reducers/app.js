// @flow
import { Action } from 'redux';
import {
  SET_TITLE,
  BACK_TO_TEACHER_DASHBOARD,
  API_INIT
} from '../actions/index';

type State = {
  title: string,
  backToTeacherDashboard: boolean,
  apiInit: any
};

const initialState: State = {
  title: 'UT-SCHOOL',
  backToTeacherDashboard: false,
  apiInit: Object
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
    case API_INIT:
      return Object.assign({}, state, {
        apiInit: action.apiInit
      });
    default:
      return state;
  }
}
