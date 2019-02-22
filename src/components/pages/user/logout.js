import React from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { logout } from '$/store/actions/user';

class UserLogout extends React.Component {
  componentDidMount() {
    // eslint-disable-next-line
    console.log('test');
    this.props.logout();
  }

  render() {
    const { user } = this.props;

    return !user.isLoggedIn ? <Redirect to="/" /> : null;
  }
}

UserLogout.propTypes = {
  logout: PropTypes.func,
  user: PropTypes.object
};

const mapStateToProps = state => {
  return {
    city: state.city,
    user: state.user
  };
};

const mapDispatchToProps = {
  logout
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserLogout);
