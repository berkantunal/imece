import React from 'react';
import { Link } from '$/components/ui/';
import { connect } from 'react-redux';
import UserNavigation from './navigation/user';
import UserCardNavigation from './navigation/user-card';
import Login from './login';
import Signup from './signup';
import ForgotPassword from './forgot-password';

import '$/assets/css/navigation.css';

const Navigation = () => {
  return (
    <nav className="navigation h-100 d-flex justify-content-end align-items-stretch">
      <div className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fa fa-home" />
        </Link>
      </div>
      <Login />
      <Signup />
      <ForgotPassword />
      <UserNavigation />
      <UserCardNavigation />
    </nav>
  );
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(Navigation);
