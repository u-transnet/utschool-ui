// @flow
import { Action } from 'redux';

type State = {
  userName: string,
  userStatus: string,
  userLogin: boolean,
  userLoginErrorText: string
};

const initialState: State = {
  userName: 'Гость',
  userStatus: 'off',
  userLogin: false,
  userLoginErrorText: ''
};

export default function theUser(
  state: State = initialState,
  action: Action
): State {
  switch (action.type) {
    case 'TOGGLE_STATUS':
      return Object.assign({}, state, {
        userStatus: action.status === 'on' ? 'off' : 'on'
      });
    case 'SET_USERNAME':
      return Object.assign({}, state, {
        userName: action.name
      });
    case 'SET_LOGIN':
      return Object.assign({}, state, {
        userLogin: action.login
      });
    case 'SET_LOGIN_ERROR_TEXT':
      return Object.assign({}, state, {
        userLoginErrorText: action.loginErrorText
      });

    default:
      return state;
  }
}
