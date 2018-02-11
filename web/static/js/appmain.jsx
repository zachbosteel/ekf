import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux'

import AppRouter from './appRouter';
import rootReducer from './reducers/rootReducer';


const store = createStore(rootReducer);


ReactDOM.render(
  <Provider store={store}>
    <AppRouter />
  </Provider>,
  document.getElementById('root')
);

