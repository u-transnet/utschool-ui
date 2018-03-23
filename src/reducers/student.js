// @flow
import { Action } from 'redux';

type State = {
  studentTab: number
};

const initialState: State = {
  studentTab: 0
};

export default function theStudent(
  state: State = initialState,
  action: Action
) {
  switch (action.type) {
    case 'TOGGLE_STUDENT_TAB':
      return Object.assign({}, state, {
        studentTab: !action.studentTab ? 0 : 1
      });
    default:
      return state;
  }
}
