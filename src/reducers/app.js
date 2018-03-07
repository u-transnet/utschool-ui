const initialState = {
  title: 'UT-SCHOOL',
  drawer: false,
  userName: 'Гость',
  userStatus: 'off'
}


const theApp = (state = initialState, action) => {
  switch (action.type) {
    case 'OPEN_DRAWER':
      return Object.assign({}, state, {
        drawer: action.drawer
      })
    case 'CLOSE_DRAWER':
      return Object.assign({}, state, {
        drawer: action.drawer
      })
    case 'TOGGLE_STATUS':
      return Object.assign({}, state, {
        userStatus: action.status === 'on' ? 'off' : 'on'
      })
    case 'SET_USERNAME':
      return Object.assign({}, state, {
        userName: action.name
      })
    case 'SET_TITLE':
      return Object.assign({}, state, {
        title: action.title 
      })
    default:
      return state
  }

}
 
export default theApp