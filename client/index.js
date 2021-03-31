import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store from './store';
import '../public/css/main.css';

ReactDOM.render(
  <Provider store={store}>
    {/* <h1>Hello from client/index.js dumdum!</h1> */}
  </Provider>,
  document.getElementById('app')
);
