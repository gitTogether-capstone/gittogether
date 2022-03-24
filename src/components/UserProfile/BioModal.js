import React, { useEffect } from 'react';
import './BioModal.css';

const BioModal = (props) => {
  useEffect(() => {
    document.addEventListener('keydown', closePic, false);
    return function cleanup() {
      document.removeEventListener('keydown', closePic, false);
    };
  }, []);

  function closePic(e) {
    if (e.key === 'Escape') {
      props.onClose();
    }
  }

  if (!props.showpic.display) {
    return null;
  }

  return (
    <div className="picture-modal" onClick={props.onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button
          style={{ cursor: 'pointer' }}
          onClick={props.onClose}
          className="button"
        >
          X
        </button>
        <img
          src={props.showpic.pic}
          style={{ height: '400px', width: '400px' }}
        />
      </div>
    </div>
  );
};

export default BioModal;
