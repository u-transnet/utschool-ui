// @flow

export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const SET_USER_NAME = 'SET_USER_NAME';

//student or teacher
export function toggleStatus(val: string) {
  return {
    type: TOGGLE_STATUS,
    status: val
  };
}

//set user name
export function setUserName(val: string) {
  return {
    type: SET_USER_NAME,
    name: val
  };
}
