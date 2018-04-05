// @flow
import { Action, Props } from 'redux';
import { TOGGLE_STATUS, SET_USER_NAME } from '../actions/actionsUser';

type State = {
  userName: string,
  userStatus: string,
  nameFieldErrorText: string
};

const initialState: State = {
  userName: 'Гость',
  userStatus: 'off',
  nameFieldError: false,
  nameFieldErrorText: ''
};

export default function theUser(
  state: State = initialState,
  action: Action,
  props: Props
): State {
  switch (action.type) {
    case TOGGLE_STATUS:
      return Object.assign({}, state, {
        userStatus: action.status === 'on' ? 'off' : 'on'
      });
    case SET_USER_NAME:
      return Object.assign({}, state, {
        userName: action.name
      });
    default:
      return state;
  }
}
