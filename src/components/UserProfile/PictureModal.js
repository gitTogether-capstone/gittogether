import React, { useEffect } from 'react';
import './PictureModal.css';

const PictureModal = (props) => {
  useEffect(() => {
    document.addEventListener('keydown', closePic, false);
    return function cleanup() {
      document.removeEventListener('keydown', closePic, false);
    };
  }, []);

  function closePic(e) {
    console.log(e.key);
    if (e.key === 'Escape') {
      props.onClose();
    }
  }

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
