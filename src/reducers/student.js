// @flow
import { Action } from 'redux';

const initialState: State = {
  studentTab: true
};

type State = {
  studentTab: boolean
};

const theStudent = (state: State = initialState, action: Action) => {
  switch (action.type) {
    case 'TOGGLE_STUDENT_TAB':
      return Object.assign({}, state, {
        studentTab: !action.studentTab ? false : true
      });
    default:
      return state;
  }
};
export default theStudent;
