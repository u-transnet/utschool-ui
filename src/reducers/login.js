// @flow
import { Action, Props } from 'redux';
import { VK_ACCESS_TOKEN } from '../actions/loginAction';

type State = {
  vkToken: string
};

const initialState: State = {
  vkToken: ''
};

export default function theLogin(
  state: State = initialState,
  action: Action,
  props: Props
): State {
  switch (action.type) {
    case VK_ACCESS_TOKEN:
      return Object.assign({}, state, {
        vkToken: action.vkToken
      });
    default:
      return state;
  }
}
