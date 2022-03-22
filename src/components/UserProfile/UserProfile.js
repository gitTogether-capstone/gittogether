import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';
import { NavLink } from 'react-router-dom';
import Modal from './ProjectModal';

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [languages, setLanguages] = useState([]);
  const [editingBio, setEditingBio] = useState(false);
  const [userBio, setUserBio] = useState('');
  const [stateError, setStateError] = useState('');
  const [show, setShow] = useState({ display: false, project: null });

  useEffect(() => {
    let username = props.match.params.user;
    async function fetchUser() {
      let user = await supabase
        .from('user')
        .select('*, userLanguages(*), languages(*), projects(*)')
        .ilike('username', username);
      console.log(user);
      setUser(user.data[0]);
      setUserBio(user.bio);
    }
    fetchUser();
  }, [props.location.pathname]);

  async function handleClick(evt) {
    evt.preventDefault();
    if (evt.target.id === 'edit-bio') {
      setEditingBio(true);
    } else if (evt.target.id === 'save-bio') {
      let { data, error } = await supabase
        .from('user')
        .update({ bio: userBio })
        .eq('id', user.id);
      if (error) {
        setStateError('There was a problem updating your bio.');
        return;
      }
      setUser({ ...user, bio: userBio });
      setEditingBio(false);
    }
  }

  return (
    <div
      id="user-profile"
      style={{ marginTop: '2rem' }}
      onClick={(e) => {
        if (show.display) {
          setShow({ display: false, project: null });
        }
      }}
    >
      <div id="user-img-name">
        <img
          id="profile-img"
          style={{ borderRadius: '50%' }}
          src={user.imageUrl}
        />

        <div id="user-name-github">
          <h3>@{user.username}</h3>
          <a
            href={`https://www.github.com/${user.username}`}
            className="github-button"
          >
            <i className="fa fa-github" style={{ fontSize: '30px' }}></i>
            Github Profile
          </a>
        </div>
        <div id="user-bio-languages">
          <div id="user-bio">
            {user.bio && !editingBio ? (
              <div style={{ marginTop: '25px' }}>
                <label htmlFor="users-bio">User bio</label>
                <p id="users-bio">{user.bio}</p>
              </div>
            ) : editingBio ? (
              <div id="editing-bio">
                <label htmlFor="editing-bio-text">User bio</label>
                <textarea
                  type="text"
                  id="editing-bio-text"
                  defaultValue={user.bio}
                  onChange={(evt) => {
                    setUserBio(evt.target.value);
                  }}
                ></textarea>
              </div>
            ) : (
              'This user has no bio.'
            )}
          </div>
          {user.id === userStore.id && !editingBio ? (
            <button
              id="edit-bio"
              className="fa fa-pencil"
              onClick={handleClick}
            ></button>
          ) : null}
          {user.id === userStore.id && editingBio ? (
            <div id="save-cancel-buttons">
              <button
                style={{ borderRadius: '25%' }}
                id="save-bio"
                onClick={handleClick}
              >
                Save
              </button>
              <button
                style={{ borderRadius: '25%' }}
                id="cancel-editing-bio"
                onClick={(e) => setEditingBio(false)}
              >
                Cancel
              </button>
            </div>
          ) : null}
          <div id="user-languages">
            <label htmlFor="languages">Languages:</label>
            <ol id="languages">
              {user.id
                ? user.languages.map((language, i) => {
                    return (
                      <li key={i} style={{ textAlign: 'left' }} id="language">
                        {language.name}
                      </li>
                    );
                  })
                : null}
            </ol>
          </div>
        </div>
      </div>
      <div id="user-projects">
        {user.id
          ? user.projects.map((project, i) => {
              return (
                <div style={{ color: 'white' }} key={i} id="project">
                  <div
                    onClick={() => setShow({ display: true, project: project })}
                  >
                    <div id="project-name">{project.name}</div>
                    <p id="project-description">{project.description}</p>
                    <div id="project-created-date">
                      Created{' '}
                      {`${project.created_at.slice(
                        5,
                        7
                      )}/${project.created_at.slice(
                        8,
                        10
                      )}/${project.created_at.slice(0, 4)}`}
                    </div>
                  </div>
                </div>
              );
            })
          : null}
      </div>
      <Modal
        id="modal"
        onClose={(e) => setShow({ display: false, project: null })}
        show={show}
      />
    </div>
  );
}

export default UserProfile;
