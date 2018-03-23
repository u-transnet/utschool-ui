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

//user actions
export function toggleStatus(val: string) {
  return {
    type: 'TOGGLE_STATUS',
    status: val
  };
}

export function setUsername(val: string) {
  return {
    type: 'SET_USERNAME',
    name: val
  };
}

export function setLogin(val: boolean) {
  return {
    type: 'SET_LOGIN',
    login: val
  };
}
