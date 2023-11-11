// Modal.js
import React from 'react';
import ReactDOM from 'react-dom';
import './Modal.css';
const Modal= ({  isOpen, onClose, children }) => {
    if (!isOpen) return null;
  const portalRoot = document.getElementById('portal-root'); // Create a new div in your HTML for the portal
  return ReactDOM.createPortal( <div className="modal">
  <div className="modal-content">
    {children}
    <button onClick={onClose}>Close Modal</button>
  </div>
</div>
, portalRoot);
};

export default Modal;
