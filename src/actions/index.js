export function openDrawer() {
  return { 
    type: 'OPEN_DRAWER',
    drawer: true
  }
}

export function closeDrawer() {
  return { 
    type: 'CLOSE_DRAWER',
    drawer: false
  }
}

export function toggleStatus(val) {
  return { 
    type: 'TOGGLE_STATUS',
    status: val
  }
}

export function setUsername(val) {
  return {
    type: 'SET_USERNAME',
    name: val
  }
}

export function toggleStudentTab(val) {
  return {
    type: 'TOGGLE_STUDENT_TAB',
    studentTab: val
  }
}