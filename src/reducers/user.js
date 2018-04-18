// @flow
import { Action, Props } from 'redux';
import {
  SET_USER_ROLE,
  SET_USER_ACCOUNT,
  SET_USER_AVATAR,
  SET_USER_FIRST_NAME,
  SET_USER_LAST_NAME
} from '../actions/actionsUser';

type State = {
  account: string,
  role: string,
  avatar: string,
  firstName: string,
  lastName: string
};

const initialState: State = {
  account: 'guest',
  role: 'Студент',
  avatar: '/avatars/guest.png',
  firstName: 'Guest',
  lastName: 'Guest'
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
    case SET_USER_FIRST_NAME:
      return Object.assign({}, state, {
        firstName: action.firstName
      });
    case SET_USER_LAST_NAME:
      return Object.assign({}, state, {
        lastName: action.lastName
      });
    default:
      return state;
  }
}
