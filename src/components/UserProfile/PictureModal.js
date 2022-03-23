import React, { useEffect } from 'react';
import './PictureModal.css';

const PictureModal = (props) => {
  if (!props.showpic.display) {
    return null;
  }

  return (
    <div className="picture-modal" onClick={props.onClose}>
      <div
        className="picture-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
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

export default PictureModal;
