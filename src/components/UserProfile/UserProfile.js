import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import supabase from '../../client';
import './style.css';

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((state) => state.user);
  const [languages, setLanguages] = useState(null);

  console.log(userStore);
  console.log(languages);
  console.log(props);

  return (
    <div id="user-profile">
      <div id="user-img-name">
        <img
          id="profile-img"
          src={userStore.identities[0]['identity_data'].avatar_url}
        />
      </div>
      <div id="user-bio-languages"></div>
      <div id="user-projects"></div>
    </div>
  );
}

export default UserProfile;
