import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';

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

  console.log(`languages`, languages);

  return (
    <div id="user-profile">
      <div id="user-img-name">
        <img
          id="profile-img"
          src={userStore.identities[0]['identity_data'].avatar_url}
        />
      </div>
      <div id="user-bio-languages">
        <div id="user-languages">
          {languages.length > 0
            ? languages.map((language, i) => {
                return (
                  <div key={i} id="language">
                    {language}
                  </div>
                );
              })
            : null}
        </div>
      </div>
      <div id="user-projects"></div>
    </div>
  );
}

export default UserProfile;
