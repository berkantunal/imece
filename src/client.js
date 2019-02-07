/* eslint-disable */

import App from '$/pages/app';
import React from 'react';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import configureStore from '$/store/';
import { hydrate } from 'react-dom';
import { Provider } from 'react-redux';

// eslint-disable-next-line  no-underscore-dangle
const store = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept('./pages/app', () => {
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  });
}
