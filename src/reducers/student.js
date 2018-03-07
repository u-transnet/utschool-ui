const initialState = {
  studentTab: 0,
}

const theStudent = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_STUDENT_TAB':
      return Object.assign({}, state, {
          studentTab: !action.studentTab ? 0 : 1
      })
    default:
          
      return state
  }
}
 
export default theStudent