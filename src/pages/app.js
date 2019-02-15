import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Home from './home';
import Product from './product';
import Category from './category';
import User from './user';

import '$/assets/css/common.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/p/:slug" component={Product} />
    <Route exact path="/category" component={Category} />
    <Route exact path="/c/:product_id" component={Category} />
    <Route exact path="/user" component={User} />
    <Route path="/user/:module" component={User} />
  </Switch>
);

export default App;
