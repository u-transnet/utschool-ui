// @flow

export function openDrawer() {
  return {
    type: 'OPEN_DRAWER',
    drawer: true
  };
}

export function closeDrawer() {
  return {
    type: 'CLOSE_DRAWER',
    drawer: false
  };
}

export function toggleStudentTab(val: boolean) {
  return {
    type: 'TOGGLE_STUDENT_TAB',
    studentTab: val
  };
}
