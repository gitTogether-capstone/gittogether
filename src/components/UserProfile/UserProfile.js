import React, { useEffect, useState } from 'react';
import supabase from '../../client';
import './style.css';
import Modal from './ProjectModal';
import PictureModal from './PictureModal';
import fetchLanguages from '../../FetchLanguages';
import BioModal from './BioModal';
import { NavLink } from 'react-router-dom';

function UserProfile(props) {
  const [user, setUser] = useState({});
  const [editingBio, setEditingBio] = useState(false);
  const [userBio, setUserBio] = useState('');
  const [stateError, setStateError] = useState('');
  const [showpic, setShowPic] = useState({ display: false, pic: null });
  const [loadingLanguages, setLoadingLanguages] = useState(false);
  const [showBio, setShowBio] = useState({ display: false, bio: null });
  const [loading, setLoading] = useState(false);
  const [isUser, setIsUser] = useState(false);

  useEffect(() => {
    setLoading(true);
    let username = props.match.params.user;
    async function fetchUser() {
      let newuser = await supabase
        .from('user')
        .select('*, userLanguages(*), languages(*), projects!projectUser(*)')
        .ilike('username', username);
      setUser(newuser.data[0]);
      setUserBio(newuser.bio);
      setLoading(false);
    }
    fetchUser();
  }, [props.location.pathname]);

  useEffect(() => {
    let currentUser = supabase.auth.user();
    if (user.id) {
      setIsUser(
        currentUser.identities[0]['identity_data'].user_name ===
          props.match.params.user
      );
    }
  }, [user]);

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
        alert('There was a problem updating your bio.');
        return;
      }
      setUser({ ...user, bio: userBio });
      setShowBio({ display: true, bio: userBio, username: user.username });
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

  if (user.id) {
    console.log(user.projects);
  }
  if (!loading) {
    return (
      <div
        id="user-profile"
        onClick={(e) => {
          if (showpic.display) {
            setShowPic({ display: false, pic: null });
          }
        }}
      >
        <div id="user-img-name">
          <img
            onClick={() => setShowPic({ display: true, pic: user.imageUrl })}
            id="profile-img"
            src={user.imageUrl}
          />

          <div id="user-name-github">
            <h2 id="profile-username">@{user.username}</h2>
            <a
              id="github-link"
              href={`https://www.github.com/${user.username}`}
              className="github-button"
              target={'_blank'}
            >
              <i className="fa fa-github"></i>
              <h2 className="github-link">Github</h2>
            </a>
          </div>
          {!loadingLanguages && isUser ? (
            <i
              className="fa fa-refresh refresh-icon"
              onClick={updateLanguages}
            ></i>
          ) : null}
          {loadingLanguages ? (
            <img
              id="loading-languages"
              src={
                'https://media1.giphy.com/media/5th8zFFsvNOuM6nGsq/giphy.gif?cid=ecf05e47d9lz7un7tkdb7pk3r266jv77ymv1dw71vk365brm&rid=giphy.gif&ct=g'
              }
            />
          ) : null}
          <div id="user-bio-languages">
            <div id="user-languages">
              <label id="label-for-languages" htmlFor="languages">
                <h3>Languages</h3>
              </label>
              <ol id="languages">
                {user.id
                  ? user.languages.map((language, i) => {
                      return (
                        <li key={i} id="language">
                          {language.name}
                        </li>
                      );
                    })
                  : null}
              </ol>
            </div>
            <h2 id="user-bio">
              <div>
                {`User bio`}
                <h4
                  id="show-bio"
                  onClick={(e) =>
                    setShowBio({
                      display: true,
                      bio: user.bio,
                      username: user.username,
                    })
                  }
                >
                  Click to view
                </h4>
              </div>
            </h2>
          </div>
          {stateError ? <div>{stateError}</div> : null}
        </div>
        <div id="user-projects">
          {user.id
            ? user.projects.map((project, i) => {
                return (
                  <NavLink to={`/projects/${project.id}`} key={i} id="project">
                    <h2 id="project-name">{project.name}</h2>
                    <p id="project-description">{project.description}</p>
                    <div id="project-footer">
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
                      <div className="proj-footer">
                        <a
                          href={project.repoLink}
                          className="github-button proj-footer"
                        >
                          <i
                            className="fa fa-github"
                            style={{ fontSize: '30px' }}
                          ></i>
                          Repo
                        </a>
                      </div>
                    </div>
                  </NavLink>
                );
              })
            : null}
        </div>
        <PictureModal
          id="picture-modal"
          showpic={showpic}
          onClose={(e) => setShowPic({ display: false, pic: null })}
        />
        <BioModal
          onClose={(e) => setShowBio({ display: false, bio: null })}
          showBio={showBio}
          setUserBio={setUserBio}
          setEditingBio={setEditingBio}
          editingBio={editingBio}
          handleClick={handleClick}
        />
      </div>
    );
  } else {
    return (
      <div id="loading-user-profile">
        <img
          src={
            'https://media1.giphy.com/media/5th8zFFsvNOuM6nGsq/giphy.gif?cid=ecf05e47d9lz7un7tkdb7pk3r266jv77ymv1dw71vk365brm&rid=giphy.gif&ct=g'
          }
        />
      </div>
    );
  }
}

export default UserProfile;
