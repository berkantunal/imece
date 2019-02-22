import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from '$/components/ui/';
import { setLoginModalVisibility, setSignupModalVisibility } from '$/store/actions/user';

import '$/assets/css/navigation.css';

const User = props => {
  const { isLoggedIn } = props.user;

  return (
    <div className="user-navigation">
      {!isLoggedIn && (
        <div className="d-flex">
          <div className="nav-item">
            <Button
              className="nav-link"
              extraClassName="btn-nav-link"
              onClick={() => {
                props.setSignupModalVisibility(true);
              }}
            >
              <i className="fa fa-pen" />
              <span className="d-none d-md-inline-block">Kayıt Ol</span>
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
              <span className="d-none d-md-inline-block">Giriş</span>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

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
