// @flow

export const SET_TITLE = 'SET_TITLE';
export const BACK_TO_TEACHER_DASHBOARD = 'BACK_TO_TEACHER_DASHBOARD';

export function setTitle(val: string) {
  return {
    type: SET_TITLE,
    title: val
  };
}

export function setBackToTeacherDashboard(val: boolean) {
  return {
    type: BACK_TO_TEACHER_DASHBOARD,
    backToTeacherDashboard: val
  };
}
