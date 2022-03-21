import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';
import { NavLink } from 'react-router-dom';

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((state) => state.user);
  const [user, setUser] = useState({});
  const [languages, setLanguages] = useState([]);
  const [editingBio, setEditingBio] = useState(false);
  const [userBio, setUserBio] = useState('');

  useEffect(() => {
    let username = props.match.params.user;
    async function fetchUser() {
      let user = await supabase
        .from('user')
        .select('*, userLanguages(*), languages(*)')
        .ilike('username', username);
      setUser(user.data[0]);
    }
    fetchUser();
  }, [props.location.pathname]);

  async function handleClick(evt) {
    evt.preventDefault();
    if (evt.target.id === 'edit-bio') {
      setEditingBio(true);
    } else if (evt.target.id === 'save-bio') {
      setEditingBio(false);
    }
  }

  return (
    <div id="user-profile">
      <div id="user-img-name">
        <img
          id="profile-img"
          style={{ borderRadius: '50%' }}
          src={user.imageUrl}
        />
        <div id="user-name-github">
          <h1>@{user.username}</h1>
          <a
            href={`https://www.github.com/${user.username}`}
            className="github-button"
          >
            <i className="fa fa-github"></i>
            Github Profile
          </a>
        </div>
      </div>
      <div id="user-bio-languages">
        <div id="user-bio">
          {user.bio && !editingBio ? (
            user.bio
          ) : editingBio ? (
            <div id="editing-bio">
              <textarea
                type="text"
                defaultValue={user.bio}
                id="editing-bio-text"
                onChange={(evt) => setUserBio(evt.target.innerText)}
              />
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
          <button
            style={{ borderRadius: '25%' }}
            id="save-bio"
            onClick={handleClick}
          >
            Save
          </button>
        ) : null}
        <div id="user-languages">
          Languages:
          <ol>
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
      <div id="user-projects"></div>
    </div>
  );
}

export default UserProfile;
