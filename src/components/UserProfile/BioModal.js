import React, { useEffect, useState } from 'react';
import supabase from '../../client';

const BioModal = (props) => {
  const user = supabase.auth.user();
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    document.addEventListener('keydown', closePic, false);

    return function cleanup() {
      document.removeEventListener('keydown', closePic, false);
    };
  }, []);

  useEffect(() => {
    setIsUser(
      user.identities[0]['identity_data'].user_name === props.showBio.username
    );
  }, [props.showBio.username]);

  function closePic(e) {
    if (e.key === 'Escape') {
      props.onClose();
    }
  }

  if (!props.showBio.display) {
    return null;
  }

  return (
    <div className="project-modal" onClick={props.onClose}>
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
        <h1 className="modal-title">
          {user.identities[0]['identity_data'].user_name ===
          props.showBio.username ? (
            <div>Your Bio</div>
          ) : (
            <div>{`${props.showBio.username}'s Bio`}</div>
          )}
        </h1>
        <div className="proj-modal-body bio-modal-body">
          {props.showBio.bio && !props.editingBio ? (
            <div>
              <p id="editing-bio-text">{props.showBio.bio}</p>
            </div>
          ) : props.editingBio ? (
            <div>
              <p>
                <textarea
                  autoFocus={true}
                  onFocus={(e) => {
                    let val = e.target.value;
                    e.target.value = '';
                    e.target.value = val;
                  }}
                  type="text"
                  id="editing-bio-text"
                  defaultValue={props.showBio.bio}
                  onChange={(evt) => {
                    props.setUserBio(evt.target.value);
                  }}
                ></textarea>
              </p>
            </div>
          ) : (
            'This user has no bio.'
          )}
        </div>
        <div>
          {isUser ? (
            <div
              className="project-date"
              style={{ marginTop: '0', marginBottom: '0' }}
            >
              {props.editingBio ? (
                <button
                  id="save-bio"
                  className="edit-bio-buttons"
                  onClick={(e) => props.handleClick(e)}
                >
                  Save
                </button>
              ) : (
                <button
                  id="edit-bio"
                  className="edit-bio-buttons"
                  onClick={(e) => props.setEditingBio(true)}
                >
                  Edit
                </button>
              )}
              {props.editingBio ? (
                <button
                  className="edit-bio-buttons"
                  onClick={(e) => props.setEditingBio(false)}
                >
                  Cancel
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default BioModal;
