import api from '../api'
import {
  GET_STATIC_PAGE_PENDING,
  GET_STATIC_PAGE_SUCCESS,
  GET_STATIC_PAGE_FAILURE,
} from './actionTypes';


function getStaticPagePending(id) {
  return {
    type: GET_STATIC_PAGE_PENDING,
    id: id,
    status: 'pending',
  };
}


function getStaticPageSuccess(staticPage) {
  return Object.assign({}, {
    type: GET_STATIC_PAGE_PENDING,
    status: 'success',
  }, staticPage);    
}


function getStaticPageFailure(error) {
  return {
    type: GET_STATIC_PAGE_FAILURE,
    status: 'failed',
    error: error,
  };
}


// THUNKS

function getStaticPage(id) {
  return (dispatch) => {
    dispatch(getStaticPagePending(id));
    api.getStaticPage(id).then((resp) => {
      dispatch(getStaticPageSuccess(resp));
    }).catch((error) => {
      dispatch(getStaticPageFailure(error));
    })
  }
}

export { getStaticPage };
