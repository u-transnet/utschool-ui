// @flow

export const SET_LECTURES = 'SET_LECTURES';
export const SET_TEACHER_LECTURES = 'SET_TEACHER_LECTURES';
export const SET_PARTICIPANTS = 'SET_PARTICIPANTS';
export const SET_APPLICATIONS = 'SET_APPLICATIONS';
export const SET_CURRENT_LECTURE = 'SET_CURRENT_LECTURE';

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
export function setParticipants(val: any) {
  return {
    type: SET_PARTICIPANTS,
    participants: val
  };
}
export function setApplications(val: any) {
  return {
    type: SET_APPLICATIONS,
    applications: val
  };
}
export function setCurrentLecture(val: any) {
  return {
    type: SET_CURRENT_LECTURE,
    currentLecture: val
  };
}
