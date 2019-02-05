import React from 'react';
import PropTypes from 'prop-types';
import cls from 'classnames';
import { Modal } from 'react-bootstrap';

import '$/assets/css/ui/modal.css';

const UIModal = props => {
  const { handleClose, show, size, title, children, className, extraClassName, footer } = props;

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size={size}
      className={cls(className, extraClassName)}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer className="justify-content-start align-items-stretch">{footer}</Modal.Footer>
    </Modal>
  );
};

UIModal.defaultProps = {
  className: 'modal-component',
  size: 'sm'
};

UIModal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  className: PropTypes.string,
  extraClassName: PropTypes.string,
  footer: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]),
  handleClose: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  size: PropTypes.string,
  title: PropTypes.string.isRequired
};

export default UIModal;
