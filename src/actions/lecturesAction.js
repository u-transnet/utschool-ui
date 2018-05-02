// @flow

export const SET_LECTURES = 'SET_LECTURES';
export const SET_TEACHER_LECTURES = 'SET_TEACHER_LECTURES';

export function setLectures(val: any) {
  return {
    type: SET_LECTURES,
    lecturesBTS: val
  };
}
export function setTeacherLectures(val: any) {
  return {
    type: SET_TEACHER_LECTURES,
    teacherLectures: val
  };
}
