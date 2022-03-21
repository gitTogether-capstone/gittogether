import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import supabase from "../../client";
import "./style.css";
import { Link } from "react-router-dom";

function UserProfile(props) {
  const [loading, setLoading] = useState(true);
  const userStore = useSelector((state) => state.user);
  const [languages, setLanguages] = useState([]);

  useEffect(() => {
    let user = supabase.auth.user();
    async function fetchLanguages() {
      // o: error is not being used
      let { data, error } = await supabase
        .from("userLanguages")
        .select(
          `
        languageId, userId,
        languages (name)
        `
        )
        .eq("userId", user.id);
      let fetchedlanguages = [];

      // o: can be made into a map
      for (let i = 0; i < data.length; i++) {
        // const fetchedlanguages = data.map((data =>{
        fetchedlanguages.push(data[i].languages.name);
      }
      // })
      setLanguages(fetchedlanguages);
    }
    fetchLanguages();
  }, []);

  return (
    <div id="user-profile">
      <div id="user-img-name">
        <img
          id="profile-img"
          src={userStore.identities[0]["identity_data"].avatar_url}
        />
        <div id="user-name-github">
          <h1>
            @{userStore.identities[0]["identity_data"].preferred_username}
          </h1>
          <Link
            to={{
              pathname: `https://www.github.com/${userStore.identities[0]["identity_data"].preferred_username}`,
            }}
            target="_blank"
          >
            <i className="fa fa-github"></i>
            Github Profile
          </Link>
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
