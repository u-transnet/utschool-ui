// @flow
import { Action } from 'redux';
import { SET_LECTURES } from '../actions/lecturesAction';

type State = {
  lecturesBTS: any
};

const initialState: State = {
  lecturesBTS: []
};

export default function theApp(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case SET_LECTURES:
      return Object.assign({}, state, {
        lecturesBTS: action.lectures
      });
    default:
      return state;
  }
}
