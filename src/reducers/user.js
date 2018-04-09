// @flow
import { Action, Props } from 'redux';
import { TOGGLE_STATUS, SET_USER_ACCOUNT } from '../actions/actionsUser';

type State = {
  account: string,
  userStatus: string,
  nameFieldErrorText: string
};

const initialState: State = {
  account: 'Гость',
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
    case SET_USER_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account
      });
    default:
      return state;
  }
}
