import React from 'react';
import { Redirect } from 'react-router-dom';
import { confirmation } from '$/store/actions/user';
import Swal from 'sweetalert2';
import _ from 'lodash';

class UserConfirmation extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      redirect: false
    };
  }

  componentDidMount() {
    const userId = _.get(this.props, 'match.params.user_id');

    confirmation(userId);

    Swal.fire({
      confirmButtonText: 'Teşekkürler!',
      title: 'Email adresiniz onaylandı.'
    });

    this.setState({
      ...this.state,
      redirect: true
    });
  }

  render() {
    const { redirect } = this.state;

    return redirect ? <Redirect to="/" /> : null;
  }
}

export default UserConfirmation;
