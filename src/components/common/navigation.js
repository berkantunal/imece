import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, Button } from '$/components/ui/';
import { setModalVisibility } from '$/store/actions/login';

import '$/assets/css/navigation.css';

const Navigation = props => {
  const { login, setModalVisibility: setVisibility } = props;
  const { loginModalVisibility } = login;

  return (
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
        <Button
          className="nav-link"
          extraClassName="btn-nav-link"
          onClick={() => {
            setVisibility(true);
          }}
        >
          <i className="fa fa-user" />
          Giriş {loginModalVisibility}
        </Button>
      </div>
    </nav>
  );
};

Navigation.propTypes = {
  login: PropTypes.object,
  setModalVisibility: PropTypes.func
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = {
  setModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Navigation);
