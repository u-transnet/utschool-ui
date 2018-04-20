// @flow
export const TOGGLE_FORM = 'TOGGLE_FORM';
export const ERROR_FLAG = 'ERROR_FLAG';

export function toggleForm(val: boolean) {
  return {
    type: TOGGLE_FORM,
    flag: val
  };
}

export function errorFlag(val: boolean) {
  return {
    type: ERROR_FLAG,
    error: val
  };
}
