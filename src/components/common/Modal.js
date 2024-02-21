import React from 'react';
import PropTypes from 'prop-types';

const Modal = ({ className, children, bool, onClose }) => {
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={`modal ${bool ? 'active' : ''} ${className ? className : ''}`} onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-head">{children.head}</div>
        <div className="modal-body">{children.body}</div>
        <div className="modal-footer">{children.footer}</div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  className: PropTypes.string,
  children: PropTypes.shape({
    head: PropTypes.node,
    body: PropTypes.node,
    footer: PropTypes.node,
  }),
  bool: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
