import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Modal } from '$/components/ui/';
import { setLoginModalVisibility } from '$/store/actions/login';
import { setSignupModalVisibility } from '$/store/actions/signup';

import '$/assets/css/header.css';

class UILogin extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowSignup = this.handleShowSignup.bind(this);
  }

  handleModalClose() {
    this.props.setLoginModalVisibility(false);
  }

  handleShowSignup() {
    this.handleModalClose();
    this.props.setSignupModalVisibility(true);
  }

  render() {
    const footerButtons = (
      <div className="d-flex w-100">
        <Button extraClassName="btn-orange">Giriş Yap</Button>
        <Button onClick={this.handleShowSignup} extraClassName="btn-dark">
          Kayıt Ol
        </Button>
      </div>
    );

    const { login } = this.props;

    return (
      <Modal
        show={login.modalVisibility}
        handleClose={this.handleModalClose}
        title="Kullanıcı Girişi"
        footer={footerButtons}
      >
        <form>
          <Input title="E-mail Adresi" />
          <Input title="Şifre" />
        </form>
      </Modal>
    );
  }
}

UILogin.propTypes = {
  login: PropTypes.object,
  setLoginModalVisibility: PropTypes.func,
  setSignupModalVisibility: PropTypes.func
};

const mapStateToProps = state => {
  return {
    login: state.login
  };
};

const mapDispatchToProps = {
  setLoginModalVisibility,
  setSignupModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UILogin);
