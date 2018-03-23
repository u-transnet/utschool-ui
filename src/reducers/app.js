// @flow
import { Action } from 'redux';

type State = {
  title: string,
  drawer: boolean
};

const initialState: State = {
  title: 'UT-SCHOOL',
  drawer: false
};

export default function theApp(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return Object.assign({}, state, {
        drawer: action.drawer
      });
    case 'CLOSE_DRAWER':
      return Object.assign({}, state, {
        drawer: action.drawer
      });
    case 'SET_TITLE':
      return Object.assign({}, state, {
        title: action.title
      });
    default:
      return state;
  }
}
