import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from '$/components/ui/';
import { Dropdown } from 'react-bootstrap';
import { setLoginModalVisibility, setSignupModalVisibility } from '$/store/actions/user';

import '$/assets/css/navigation.css';

const UserCard = props => {
  const { isLoggedIn, user } = props.user;

  if (!isLoggedIn) {
    return null;
  }

  return (
    <div className="user-card-navigation" key={user.userId}>
      <Dropdown>
        <Dropdown.Toggle className="d-flex align-items-center" id="dropdown-basic">
          <img className="mr-2" src="https://via.placeholder.com/40x40.png?text=40x40" alt="User" />
          {`${user.firstName} ${user.lastName}`}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Link className="dropdown-item" activeClassName="" to="/user/favorites">
            Favorilerim
          </Link>
          <Link className="dropdown-item" activeClassName="" to="/user/products">
            Ürünlerim
          </Link>
          <Link className="dropdown-item" activeClassName="" to="/user/information">
            Hesap Bilgileri
          </Link>
          <Link className="dropdown-item" activeClassName="" to="/user/logout">
            Çıkış
          </Link>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

UserCard.propTypes = {
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
)(UserCard);
