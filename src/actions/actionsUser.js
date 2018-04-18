// @flow

export const SET_USER_ROLE = 'SET_USER_ROLE';
export const SET_USER_ACCOUNT = 'SET_USER_ACCOUNT';
export const SET_USER_AVATAR = 'SET_USER_AVATAR';

export const SET_USER_FIRST_NAME = 'SET_USER_FIRST_NAME';
export const SET_USER_LAST_NAME = 'SET_USER_LAST_NAME';

//student or teacher
export function setUserRole(val: string) {
  return {
    type: SET_USER_ROLE,
    role: val
  };
}

//set user account
export function setAccountName(val: string) {
  return {
    type: SET_USER_ACCOUNT,
    account: val
  };
}

//set user avatar
export function setAvatar(val: string) {
  return {
    type: SET_USER_AVATAR,
    avatar: val
  };
}

//set user first name
export function setFirstName(val: string) {
  return {
    type: SET_USER_FIRST_NAME,
    firstName: val
  };
}

//set user last name
export function setLastName(val: string) {
  return {
    type: SET_USER_LAST_NAME,
    lastName: val
  };
}
