// @flow

export const SET_LECTURES = 'SET_LECTURES';

export function setLectures(val: any) {
  return {
    type: SET_LECTURES,
    lectures: val
  };
}
