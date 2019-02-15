import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';

import '$/assets/css/ui/alert.css';

class Alert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      close: false
    };

    this.handleClose = this.handleClose.bind(this);
  }

  handleClose = () => {
    this.setState({
      close: true
    });
  };

  render() {
    const { children, closable, extraClassName, type } = this.props;
    const { close } = this.state;

    if (close) {
      return null;
    }

    return (
      <div className={cls(`ui-alert alert alert-${type}`, extraClassName)}>
        {children}
        {closable && (
          <button type="button" className="close" onClick={this.handleClose}>
            <span aria-hidden="true">&times;</span>
          </button>
        )}
      </div>
    );
  }
}

Alert.defaultProps = {
  extraClassName: '',
  type: 'danger'
};

Alert.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  closable: PropTypes.bool,
  extraClassName: PropTypes.string,
  type: PropTypes.string
};

export default Alert;
