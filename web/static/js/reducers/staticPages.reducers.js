import {
  GET_STATIC_PAGE_PENDING,
  GET_STATIC_PAGE_SUCCESS,
  GET_STATIC_PAGE_FAILURE,
} from '../actions/actionTypes';


const initialState = {
  id: 0,
  status: 'success',
  error: undefined,
  title: '',
  texts: [],
  images: [], 
}


const staticPage = (state = initialState, action) => {
  switch action.type {
    case GET_STATIC_PAGE_PENDING: {
      return Object.assign({}, state, action);
    }
    case GET_STATIC_PAGE_SUCCESS: {
      return Object.assign({}, state, action);
    }
    case GET_STATIC_PAGE_FAILURE: {
      return Object.assign({}, state, action);
    }
    default: 
      return state;
  }
}


export { staticPage, initialState }
