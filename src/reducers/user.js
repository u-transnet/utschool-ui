// @flow
import { Action, Props } from 'redux';
import {
  SET_USER_ROLE,
  SET_USER_ACCOUNT,
  SET_USER_AVATAR
} from '../actions/actionsUser';

type State = {
  account: string,
  role: string,
  avatar: string
};

const initialState: State = {
  account: 'guest',
  role: 'Студент',
  avatar: '/avatars/guest.png'
};

export default function theUser(
  state: State = initialState,
  action: Action,
  props: Props
): State {
  switch (action.type) {
    case SET_USER_ROLE:
      return Object.assign({}, state, {
        role: action.role
      });
    case SET_USER_ACCOUNT:
      return Object.assign({}, state, {
        account: action.account
      });
    case SET_USER_AVATAR:
      return Object.assign({}, state, {
        avatar: action.avatar
      });
    default:
      return state;
  }
}
