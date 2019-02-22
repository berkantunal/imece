import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import Social from '$/components/common/social';
import React from 'react';
import { Link } from '$/components/ui/';
import _ from 'lodash';

import Favorites from './user/favorites';
import Information from './user/information';
import Products from './user/products';
import Logout from './user/logout';

import '$/assets/css/user.css';

const User = props => {
  const module = _.get(props, 'match.params.module');
  // eslint-disable-next-line no-console
  // console.log(props);
  let children;
  switch (module) {
    case 'favorites':
      children = <Favorites {...props} />;
      break;
    case 'information':
      children = <Information {...props} />;
      break;
    case 'products':
      children = <Products {...props} />;
      break;
    case 'logout':
      children = <Logout {...props} />;
      break;
    default:
      children = <Information {...props} />;
      break;
  }

  return (
    <div className="main-container">
      <Header />
      <div className="gray-bg">
        <div className="container">
          <div className="row justify-content-stretch">
            <div className="col-12 col-sm-3">
              <div className="my-4 p-2 user-card">
                <img
                  className="d-none d-sm-block mb-2"
                  src="https://via.placeholder.com/300x300.png?text=Profil"
                  alt="User"
                />
                <ul className="list-unstyled mt-0 mt-sm-2 nav flex-column">
                  <li>
                    <Link className="nav-link" to="/user/favorites">
                      Favorilerim
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/user/products">
                      Ürünlerim
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/user/information">
                      Hesap Bilgileri
                    </Link>
                  </li>
                  <li>
                    <Link className="nav-link" to="/user/logout">
                      Çıkış
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-9">{children}</div>
          </div>
        </div>
      </div>
      <div className="orange-bg">
        <div className="container">
          <Social />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default User;
