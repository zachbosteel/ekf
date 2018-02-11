import { combineReducers } from 'redux'

import { staticPage } from './staticPages.reducers';

export const rootReducer = combineReducers({
  staticPage,
});
