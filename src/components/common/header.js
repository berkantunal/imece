import React from 'react';
import logo from '$/assets/img/react.svg';
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
              <Link className="logo d-flex py-2 align-items-center" to="/">
                <img src={logo} className="mr-2" alt="Max Cepte" />
                Max Cepte
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
