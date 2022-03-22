import React, { useEffect } from 'react';
import './ProjectModal.css';

const Modal = (props) => {
  if (!props.show.display) {
    return null;
  }

  function closeOnEsc(e) {
    e.preventDefault();
    if ((e.charCode || e.keyCode) === 27) {
      props.onClose();
    }
  }

  console.log(props.show.project);

  return (
    <div className="modal" onClick={props.onClose}>
      <div className="modal-footer">
        <button
          style={{ cursor: 'pointer' }}
          onClick={props.onClose}
          className="button"
        >
          X
        </button>
      </div>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h4 className="modal-title">{props.show.project.name}</h4>
        <div className="modal-body">{props.show.project.description}</div>
        <div className="project-date">
          <div>
            Created{' '}
            {`${props.show.project.created_at.slice(
              5,
              7
            )}/${props.show.project.created_at.slice(
              8,
              10
            )}/${props.show.project.created_at.slice(0, 4)}`}
          </div>
          <a href={props.show.project.repoLink} className="github-button">
            <i className="fa fa-github" style={{ fontSize: '30px' }}></i>
            Repo
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
