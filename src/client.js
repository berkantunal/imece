import App from '$/pages/app';
import BrowserRouter from 'react-router-dom/BrowserRouter';
import React from 'react';
import { hydrate } from 'react-dom';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  // eslint-disable-next-line prettier/prettier
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}
