import React from 'react';
import logo from '$/assets/img/logo.png';
import { Link } from '$/components/ui/';
import Navigation from './navigation';

import '$/assets/css/header.css';

const Header = () => {
  return (
    <header>
      <div className="orange-bg">
        <div className="container">
          <div className="row justify-content-between">
            <div className="col-4">
              <Link className="logo d-flex align-items-center" to="/">
                <img src={logo} className="mr-2" alt="Ucuz Max" />
              </Link>
            </div>
            <div className="col-6">
              <Navigation />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
