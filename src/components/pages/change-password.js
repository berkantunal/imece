import Header from '$/components/common/header';
import Footer from '$/components/common/footer';
import Social from '$/components/common/social';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Alert, Button, Title, Input } from '$/components/ui/';
import { changePassword, setLoginModalVisibility } from '$/store/actions/user';
import _ from 'lodash';

import '$/assets/css/change-password.css';

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.state = {
      form: {},
      loading: null,
      redirect: false,
      showError: false,
      success: null
    };
  }

  handleChange = event => {
    const { form } = this.state;
    const { checked, value, name, type } = event.target;

    if (type === 'checkbox') {
      form[name] = checked;
    } else {
      form[name] = value;
      if (!value) {
        delete form[name];
      }
    }

    this.setState({
      ...this.state,
      form
    });
  };

  handleSubmit = async () => {
    const { form } = this.state;

    if (!form.password || !form.passwordRepeat || form.password !== form.passwordRepeat) {
      this.setState({
        ...this.state,
        showError: true
      });

      return false;
    }

    form.hash = _.get(this.props, 'match.params.hash');

    this.setState({
      ...this.state,
      loading: true
    });

    changePassword(form).then(response => {
      this.setState({
        ...this.state,
        loading: false,
        success: response.success
      });

      if (response.success) {
        setTimeout(() => {
          this.setState({
            ...this.state,
            redirect: true
          });

          this.props.setLoginModalVisibility(true);
        }, 3000);
      }
    });

    return true;
  };

  render() {
    const { form, loading, redirect, showError, success } = this.state;

    return (
      <div className="main-container">
        {redirect && <Redirect to="/" />}
        <Header />
        <div className="gray-bg py-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-4 offset-lg-4 pb-3">
                <div className="header py-3">
                  <Title type="h2" extraClassName="bold">
                    Şifre Değiştirme
                  </Title>
                </div>
                <form className="password-change-form">
                  {success === true && <Alert type="success">Şifreniz değiştirildi</Alert>}
                  {success === false && <Alert type="success">Şifreniz değiştirilemedi</Alert>}
                  <Input
                    title="Şifre"
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={this.handleChange}
                  />
                  {showError && !form.password && <Alert>Lütfen şifre girin.</Alert>}
                  <Input
                    title="Şifre Tekrar"
                    name="passwordRepeat"
                    type="password"
                    value={form.passwordRepeat}
                    onChange={this.handleChange}
                  />
                  {showError && !form.password && <Alert>Lütfen şifreyi onaylayın girin.</Alert>}
                  {showError && form.password !== form.passwordRepeat && (
                    <Alert>Şifreler aynı değil.</Alert>
                  )}
                  <Button
                    loading={loading}
                    extraClassName="btn-orange w-100"
                    onClick={this.handleSubmit}
                  >
                    Şifremi Değiştir
                  </Button>
                </form>
              </div>
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
  }
}

ForgotPassword.propTypes = {
  setLoginModalVisibility: PropTypes.func
};

const mapStateToProps = () => {};

const mapDispatchToProps = {
  setLoginModalVisibility
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ForgotPassword);
