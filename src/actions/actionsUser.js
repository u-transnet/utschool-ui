// @flow

export const TOGGLE_STATUS = 'TOGGLE_STATUS';
export const SET_USER_NAME = 'SET_USER_NAME';
export const SET_FIELD_ERROR = 'SET_FIELD_ERROR';
export const SET_LOGIN_ERROR_TEXT = 'SET_LOGIN_ERROR_TEXT';

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

//error flag for name field on login page
export function setNameFieldError(val: boolean) {
  return {
    type: SET_FIELD_ERROR,
    nameFieldError: val
  };
}

//error text for name field on login page
export function setNameFieldErrorText(val: string) {
  return {
    type: SET_LOGIN_ERROR_TEXT,
    nameFieldErrorText: val
  };
}
