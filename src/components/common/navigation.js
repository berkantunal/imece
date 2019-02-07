import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Button } from '$/components/ui/';
import { Dropdown } from 'react-bootstrap';
import Login from './login';
import Signup from './signup';
import { setLoginModalVisibility, setSignupModalVisibility } from '$/store/actions/user';

import '$/assets/css/navigation.css';

const Navigation = props => {
  const { isLoggedIn } = props.user;

  let userNavigation;
  if (isLoggedIn) {
    userNavigation = (
      <div className="user-card-navigation d-flex">
        <Dropdown>
          <Dropdown.Toggle className="d-flex align-items-center" id="dropdown-basic">
            <img
              className="mr-2"
              src="https://via.placeholder.com/40x40.png?text=40x40"
              alt="User"
            />
            Berkant Ulaş Ünal
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Link className="dropdown-item" to="/user/favorites">
              Favorilerim
            </Link>
            <Link className="dropdown-item" to="/user/information">
              Hesap Bilgileri
            </Link>
            <Link className="dropdown-item" to="/user/logout">
              Çıkış
            </Link>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    );
  } else {
    userNavigation = (
      <div className="user-navigation d-flex">
        <div className="nav-item">
          <Button
            className="nav-link"
            extraClassName="btn-nav-link"
            onClick={() => {
              props.setSignupModalVisibility(true);
            }}
          >
            <i className="fa fa-pen" />
            Kayıt Ol
          </Button>
        </div>
        <div className="nav-item">
          <Button
            className="nav-link"
            extraClassName="btn-nav-link"
            onClick={() => {
              props.setLoginModalVisibility(true);
            }}
          >
            <i className="fa fa-user" />
            Giriş
          </Button>
        </div>
      </div>
    );
  }

  return (
    <nav className="navigation h-100 d-flex justify-content-end align-items-stretch">
      <div className="nav-item">
        <Link className="nav-link" to="/">
          <i className="fa fa-home" />
        </Link>
      </div>
      <Login />
      <Signup />
      {userNavigation}
    </nav>
  );
};

Navigation.propTypes = {
  setLoginModalVisibility: PropTypes.func,
  setSignupModalVisibility: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

const mapDispatchToProps = {
  setLoginModalVisibility,
  setSignupModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
