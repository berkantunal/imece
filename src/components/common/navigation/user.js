/* eslint-disable */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Button } from '$/components/ui/';
import { Dropdown } from 'react-bootstrap';
import { setLoginModalVisibility, setSignupModalVisibility } from '$/store/actions/user';

import '$/assets/css/navigation.css';

const User = props => {
  const { isLoggedIn, user } = props.user;

  return (
    <div className="user-navigation">
      {!isLoggedIn && (
        <div className="d-flex">
          <div className="nav-item">
            <Button
              className="nav-link"
              extraClassName="btn-nav-link"
              onClick={() => {
                this.props.setSignupModalVisibility(true);
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
                this.props.setLoginModalVisibility(true);
              }}
            >
              <i className="fa fa-user" />
              Giriş
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

User.propTypes = {
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
)(User);
