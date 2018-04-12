// @flow

export const SET_TITLE = 'SET_TITLE';

export function setTitle(val: string) {
  return {
    type: SET_TITLE,
    title: val
  };
}

export function toggleStudentTab(val: boolean) {
  return {
    type: 'TOGGLE_STUDENT_TAB',
    studentTab: val
  };
}
