import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Input, Button, Modal } from '$/components/ui/';
import { setLoginModalVisibility } from '$/store/actions/login';
import { setSignupModalVisibility } from '$/store/actions/signup';

import '$/assets/css/header.css';

class UISignup extends React.Component {
  constructor(props) {
    super(props);

    this.handleModalClose = this.handleModalClose.bind(this);
    this.handleShowLogin = this.handleShowLogin.bind(this);
  }

  handleModalClose() {
    this.props.setSignupModalVisibility(false);
  }

  handleShowLogin() {
    this.handleModalClose();
    this.props.setLoginModalVisibility(true);
  }

  render() {
    const footerButtons = (
      <div className="d-flex w-100">
        <Button extraClassName="btn-dark">Kayıt Ol</Button>
        <Button onClick={this.handleShowLogin} extraClassName="btn-orange">
          Giriş Yap
        </Button>
      </div>
    );

    const { signup } = this.props;

    return (
      <Modal
        show={signup.modalVisibility}
        handleClose={this.handleModalClose}
        title="Kayıt Ol"
        footer={footerButtons}
      >
        <form>
          <Input title="E-mail Adresi" />
          <Input title="Şifre" />
          <Input title="Şifre Tekrar" />
        </form>
      </Modal>
    );
  }
}

UISignup.propTypes = {
  setLoginModalVisibility: PropTypes.func,
  setSignupModalVisibility: PropTypes.func,
  signup: PropTypes.object
};

const mapStateToProps = state => {
  return {
    signup: state.signup
  };
};

const mapDispatchToProps = {
  setLoginModalVisibility,
  setSignupModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UISignup);
