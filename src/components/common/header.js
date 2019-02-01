import React from 'react';
import logo from '$/assets/img/react.svg';
import { Link } from '$/components/ui/';

import '$/assets/css/header.css';

const Header = () => {
  return (
    <header>
      <div className="orange-bg">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-4">
              <Link className="logo d-flex py-2 align-items-center" to="/">
                <img src={logo} className="mr-2" alt="Max Cepte" />
                Max Cepte
              </Link>
            </div>
            <div className="col-6">
              <nav className="navigation h-100 d-flex justify-content-end align-items-stretch">
                <div className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-home" />
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-pencil" />
                    Kayıt Ol
                  </Link>
                </div>
                <div className="nav-item">
                  <Link className="nav-link" to="/">
                    <i className="fa fa-user" />
                    Giriş
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
