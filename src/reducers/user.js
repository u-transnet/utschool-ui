// @flow
import { Action } from 'redux';
import {
  TOGGLE_STATUS,
  SET_USER_NAME,
  SET_FIELD_ERROR,
  SET_LOGIN_ERROR_TEXT
} from '../actions/actionsUser';

type State = {
  userName: string,
  userStatus: string,
  nameFieldError: boolean,
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
  action: Action
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
    case SET_FIELD_ERROR:
      return Object.assign({}, state, {
        nameFieldError: action.nameFieldError
      });
    case SET_LOGIN_ERROR_TEXT:
      return Object.assign({}, state, {
        nameFieldErrorText: action.nameFieldErrorText
      });

    default:
      return state;
  }
}
