import React from 'react';
import Route from 'react-router-dom/Route';
import Switch from 'react-router-dom/Switch';

import Home from './home';
import Menu from './menu';
import Product from './product';
import Category from './category';
import Checkout from './checkout';
import UserConfirmation from './user-confirmation';
import User from './user';
import ChangePassword from './change-password';

import '$/assets/css/common.css';

const App = () => (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route exact path="/m/:slug" component={Menu} />
    <Route exact path="/p/:slug" component={Product} />
    <Route exact path="/category" component={Category} />
    <Route exact path="/c/:product_id" component={Category} />
    <Route exact path="/user" component={User} />
    <Route exact path="/change-password/:hash" component={ChangePassword} />
    <Route path="/user/confirmation/:user_id" component={UserConfirmation} />
    <Route path="/user/:module" component={User} />
    <Route path="/checkout/:slug/:product_id" component={Checkout} />
  </Switch>
);

export default App;
