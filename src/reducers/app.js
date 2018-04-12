// @flow
import { Action } from 'redux';

type State = {
  title: string
};

const initialState: State = {
  title: 'UT-SCHOOL'
};

export default function theApp(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'SET_TITLE':
      return Object.assign({}, state, {
        title: action.title
      });
    default:
      return state;
  }
}
