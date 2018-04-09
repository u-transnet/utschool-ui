// @flow

export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';

//student or teacher
export function toggleStatus(val: string) {
  return {
    type: TOGGLE_STATUS,
    status: val
  };
}

//set user account
export function setAccountName(val: string) {
  return {
    type: SET_USER_ACCOUNT,
    account: val
  };
}
