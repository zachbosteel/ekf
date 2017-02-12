import { createStore } from 'redux';

let initialState = {
  isAuthenticated: false,
  currentUser: {},
  errors: '',
}

// user state reducer
function login(state, action) {
  if (typeof state === 'undefined') {
    return initialState;
  }
  switch (action.type) {
    case 'AUTHENTICATED':
      return {
              isAuthenticated: true, 
              currentUser: action.user,
              errors: ''}
    case 'FAILED':
      return {isAuthenticated: false, currentUser: {}, errors: action.error}
    case 'LOGOUT':
      return initialState
    default:
      return state
  }
}


let store = createStore(login)


export default store
