// @flow
import { Action, Props } from 'redux';
import { TOGGLE_FORM } from '../actions/loginAction';

type State = {
  formFlag: boolean,
  error: boolean
};

const initialState: State = {
  formFlag: false,
  error: false
};

export default function theLogin(
  state: State = initialState,
  action: Action,
  props: Props
): State {
  switch (action.type) {
    case TOGGLE_FORM:
      return Object.assign({}, state, {
        formFlag: !action.flag
      });
    default:
      return state;
  }
}
