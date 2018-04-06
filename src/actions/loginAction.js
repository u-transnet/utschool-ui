// @flow
export const TOGGLE_FORM = 'TOGGLE_FORM';

export function toggleForm(val: boolean) {
  return {
    type: TOGGLE_FORM,
    flag: val
  };
}
