import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';
import Modal from './ProjectModal';
import PictureModal from './PictureModal';
import fetchLanguages from '../../FetchLanguages';

function UserProfile(props) {
  const userStore = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [editingBio, setEditingBio] = useState(false);
  const [userBio, setUserBio] = useState('');
  const [stateError, setStateError] = useState('');
  const [show, setShow] = useState({ display: false, project: null });
  const [showpic, setShowPic] = useState({ display: false, pic: null });
  const [loadingLanguages, setLoadingLanguages] = useState(false);

  useEffect(() => {
    let username = props.match.params.user;
    async function fetchUser() {
      let newuser = await supabase
        .from('user')
        .select('*, userLanguages(*), languages(*), projects!projectUser(*)')
        .ilike('username', username);
      setUser(newuser.data[0]);
      setUserBio(newuser.bio);
    }
    fetchUser();
  }, [props.location.pathname]);

  async function handleClick(evt) {
    evt.preventDefault();
    setStateError('');
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

  async function updateLanguages(evt) {
    evt.preventDefault();
    setLoadingLanguages(true);
    await fetchLanguages();
    let username = props.match.params.user;
    let newuser = await supabase
      .from('user')
      .select('*, userLanguages(*), languages(*), projects!projectUser(*)')
      .ilike('username', username);
    setUser(newuser.data[0]);
    setUserBio(newuser.bio);
    setLoadingLanguages(false);
  }

  return (
    <div
      id="user-profile"
      style={{ marginTop: '2rem' }}
      onClick={(e) => {
        if (show.display) {
          setShow({ display: false, project: null });
        }
        if (showpic.display) {
          setShowPic({ display: false, pic: null });
        }
      }}
    >
      <div id="user-img-name">
        <img
          onClick={() => setShowPic({ display: true, pic: user.imageUrl })}
          id="profile-img"
          style={{ borderRadius: '50%', cursor: 'pointer' }}
          src={user.imageUrl}
        />

        <div id="user-name-github">
          <h3 style={{ color: '#66FCF1' }}>@{user.username}</h3>
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
            {user.id === userStore.id && !editingBio ? (
              <button
                id="edit-bio"
                className="fa fa-pencil"
                onClick={handleClick}
              ></button>
            ) : null}
            {user.bio && !editingBio ? (
              <div style={{ marginTop: '5px' }}>
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
          <div id="user-languages" style={{ marginRight: '25px' }}>
            {!loadingLanguages ? (
              <i
                style={{ marginTop: '20px' }}
                className="fa fa-refresh refresh-icon"
                onClick={updateLanguages}
              ></i>
            ) : null}
            <label style={{ marginTop: '5px' }} htmlFor="languages">
              Languages:
            </label>
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
        {stateError ? <div>{stateError}</div> : null}

        {loadingLanguages ? (
          <img
            style={{ width: '50px', height: '50px' }}
            src={
              'https://media1.giphy.com/media/5th8zFFsvNOuM6nGsq/giphy.gif?cid=ecf05e47d9lz7un7tkdb7pk3r266jv77ymv1dw71vk365brm&rid=giphy.gif&ct=g'
            }
          />
        ) : null}
      </div>
      <div id="user-projects">
        {user.id
          ? user.projects.map((project, i) => {
              return (
                <div
                  style={{ color: 'white', cursor: 'pointer' }}
                  key={i}
                  id="project"
                >
                  <div
                    onClick={() => setShow({ display: true, project: project })}
                  >
                    <h2 id="project-name">{project.name}</h2>
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
        id="project-modal"
        onClose={(e) => setShow({ display: false, project: null })}
        show={show}
      />
      <PictureModal
        id="picture-modal"
        showpic={showpic}
        onClose={(e) => setShowPic({ display: false, pic: null })}
      />
    </div>
  );
}

export default UserProfile;
