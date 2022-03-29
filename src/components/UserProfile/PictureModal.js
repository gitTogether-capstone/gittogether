import React, { useEffect } from 'react';
import './PictureModal.css';

const PictureModal = (props) => {
  // o: destructure props

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
      <div
        className="picture-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={props.onClose} className="button">
          X
        </button>
        <img src={props.showpic.pic} id="profile-pic" />
      </div>
    </div>
  );
};

export default PictureModal;
