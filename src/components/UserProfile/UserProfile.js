import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';
import { NavLink } from 'react-router-dom';

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((state) => state.user);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    let user = supabase.auth.user();
    async function fetchLanguages() {
      let { data, error } = await supabase
        .from('userLanguages')
        .select(
          `
        languageId, userId,
        languages (name)
        `
        )
        .eq('userId', user.id);
      let fetchedlanguages = [];
      for (let i = 0; i < data.length; i++) {
        fetchedlanguages.push(data[i].languages.name);
      }
      setLanguages(fetchedlanguages);
    }
    fetchLanguages();
  }, []);

  return (
    <div id="user-profile">
      <div id="user-img-name">
        <img
          id="profile-img"
          src={userStore.identities[0]['identity_data'].avatar_url}
        />
        <div id="user-name-github">
          <h1>
            @{userStore.identities[0]['identity_data'].preferred_username}
          </h1>
          <a
            href={`https://www.github.com/${userStore.identities[0]['identity_data'].preferred_username}`}
            className="github-button"
          >
            <i className="fa fa-github"></i>
            Github Profile
          </a>
        </div>
      </div>
      <div id="user-bio-languages">
        <div id="user-bio">This user has no bio.</div>
        <div id="user-languages">
          Languages:
          <ol>
            {languages.length > 0
              ? languages.map((language, i) => {
                  return (
                    <li key={i} id="language">
                      {language}
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
