import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Routes from "./Routes";
import Navbar from "./components/navbar/Navbar";
import supabase from "./client";
import { setUser } from "./store/user";
import { useHistory } from "react-router-dom";
import { Octokit } from "@octokit/core";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [session, setSession] = useState(null);

  useEffect(() => {
    let user = supabase.auth.session();
    setSession(user);
  }, []);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", () => {
      checkUser();
      history.push("/");
    });
  }, []);

  const checkUser = async () => {
    const user = supabase.auth.user();
    const userSession = supabase.auth.session();

    dispatch(setUser(user));

    if (user) {
      //see if user exists in DB yet
      let { data, err } = await supabase
        .from("user")
        .select("*")
        .eq("id", user.id);
      if (data.length === 0) {
        //if user doesn't exist yet, add them
        let { data, err } = await supabase.from("user").insert([
          {
            id: user.id,
            username: user.identities[0]["identity_data"].preferred_username,
          },
        ]);
        //octo kit needs to be authorized with users provider token
        const octokit = new Octokit({
          auth: userSession.provider_token,
        });
        let repoqueries = [];
        let page = 1;
        //grab first page of repos
        let langquery = await octokit.request(
          `GET /user/repos?per_page=100&page=${page}`,
          {
            sort: "full_name",
          }
        );
        repoqueries.push(
          ...langquery.data.filter((repo) => repo["node_id"].length === 12)
        );
        page = page + 1;
        //while you aren't on the last or only page
        while (langquery.headers.link.includes("next")) {
          //request again with incremented page count
          langquery = await octokit.request(
            `GET /user/repos?per_page=100&page=${page}`,
            {
              sort: "full_name",
            }
          );
          repoqueries.push(
            ...langquery.data.filter((repo) => repo["node_id"].length === 12)
          );
          page = page + 1;
        }

        let languages = {};
        //loop through repos, store the top language in an object
        for (let i = 0; i < repoqueries.length; i++) {
          if (languages[repoqueries[i].language]) {
            languages[repoqueries[i].language] =
              languages[repoqueries[i].language] + 1;
          } else {
            languages[repoqueries[i].language] = 1;
          }
        }
        let langkeys = Object.keys(languages);
        //loop through languages
        for (let i = 0; i < langkeys.length; i++) {
          //grab all languages in DB
          let { data, err } = await supabase.from("languages").select("*");

          let languages = [];
          let langvalues = Object.values(data);
          //loop through languages and put name of them in an array
          for (let i = 0; i < langvalues.length; i++) {
            if (langvalues[i].name !== null) {
              languages.push(langvalues[i].name);
            }
          }

          //if language not in database and isn't null(comes out as a string)
          if (!languages.includes(langkeys[i]) && langkeys[i] !== "null") {
            //insert language into DB
            let { data, error } = await supabase
              .from("languages")
              .insert([{ name: `${langkeys[i]}` }]);
            //grab language to get its ID
            let { langdata, err } = await supabase
              .from("languages")
              .select("*")
              .eq("name", `${langkeys[i]}`);
            //insert users language into userLanguages
            let { dataa, errr } = await supabase
              .from("userLanguages")
              .insert([{ languageId: langdata.id, userId: user.id }]);
            //if language exists in DB and isn't null
          } else if (langkeys[i] !== "null") {
            //filter current language out of list of languages fetched earlier
            let language = data.filter((lang) => lang.name === langkeys[i]);
            //insert users language into userLanguages
            let { newdata, err } = await supabase
              .from("userLanguages")
              .insert([{ languageId: language[0].id, userId: user.id }]);
          }
        }
      }
    }
  };
  return (
    <div className="App">
      <Navbar />
      <Routes session={session} />
    </div>
  );
}

export default App;

// import './App.css';
// import React, { useEffect, useState } from 'react';
// import { useDispatch } from 'react-redux';
// import Routes from './Routes';
// import Navbar from './components/navbar/Navbar';
// import supabase from './client';
// import { setUser } from './store/user';
// import { useHistory } from 'react-router-dom';
// import { Octokit } from '@octokit/core';

// function App() {
//   const dispatch = useDispatch();
//   const history = useHistory();

//   const [session, setSession] = useState(null);

//   useEffect(() => {
//     let user = supabase.auth.session();
//     setSession(user);
//   }, []);

//   useEffect(() => {
//     checkUser();
//     window.addEventListener('hashchange', () => {
//       checkUser();
//       history.push('/');
//     });
//   }, []);

//   const checkUser = async () => {
//     const user = supabase.auth.user();
//     const userSession = supabase.auth.session();

//     dispatch(setUser(user));

//     if (user) {
//       //see if user exists in DB yet
//       let { data, err } = await supabase
//         .from('user')
//         .select('*')
//         .eq('id', user.id);
//       if (data.length === 0) {
//         //if user doesn't exist yet, add them
//         let { data, err } = await supabase.from('user').insert([
//           {
//             id: user.id,
//             username: user.identities[0]['identity_data'].preferred_username,
//           },
//         ]);
//         //octo kit needs to be authorized with users provider token
//         const octokit = new Octokit({
//           auth: userSession.provider_token,
//         });
//         let repoqueries = [];
//         let page = 1;
//         //grab first page of repos
//         let langquery = await octokit.request(
//           `GET /user/repos?per_page=100&page=${page}`,
//           {
//             sort: 'full_name',
//           }
//         );
//         repoqueries.push(
//           ...langquery.data.filter((repo) => repo['node_id'].length === 12)
//         );
//         page = page + 1;
//         //while you aren't on the last or only page
//         while (langquery.headers.link.includes('next')) {
//           //request again with incremented page count
//           langquery = await octokit.request(
//             `GET /user/repos?per_page=100&page=${page}`,
//             {
//               sort: 'full_name',
//             }
//           );
//           repoqueries.push(
//             ...langquery.data.filter((repo) => repo['node_id'].length === 12)
//           );
//           page = page + 1;
//         }

//         let languages = {};
//         //loop through repos, store the top language in an object
//         for (let i = 0; i < repoqueries.length; i++) {
//           if (languages[repoqueries[i].language]) {
//             languages[repoqueries[i].language] =
//               languages[repoqueries[i].language] + 1;
//           } else {
//             languages[repoqueries[i].language] = 1;
//           }
//         }
//         let langkeys = Object.keys(languages);
//         //loop through languages
//         for (let i = 0; i < langkeys.length; i++) {
//           //grab all languages in DB
//           let { data, err } = await supabase.from('languages').select('*');

//           let languages = [];
//           let langvalues = Object.values(data);
//           //loop through languages and put name of them in an array
//           for (let i = 0; i < langvalues.length; i++) {
//             if (langvalues[i].name !== null) {
//               languages.push(langvalues[i].name);
//             }
//           }

//           //if language not in database and isn't null(comes out as a string)
//           if (!languages.includes(langkeys[i]) && langkeys[i] !== 'null') {
//             //insert language into DB
//             let { data, error } = await supabase
//               .from('languages')
//               .insert([{ name: `${langkeys[i]}` }]);
//             //grab language to get its ID
//             let { langdata, err } = await supabase
//               .from('languages')
//               .select('*')
//               .eq('name', `${langkeys[i]}`);
//             //insert users language into userLanguages
//             let { dataa, errr } = await supabase
//               .from('userLanguages')
//               .insert([{ languageId: langdata.id, userId: user.id }]);
//             //if language exists in DB and isn't null
//           } else if (langkeys[i] !== 'null') {
//             //filter current language out of list of languages fetched earlier
//             let language = data.filter((lang) => lang.name === langkeys[i]);
//             //insert users language into userLanguages
//             let { newdata, err } = await supabase
//               .from('userLanguages')
//               .insert([{ languageId: language[0].id, userId: user.id }]);
//           }
//         }
//       }
//     }
//   };
//   return (
//     <div className="App">
//       <Navbar />
//       <Routes session={session} />
//     </div>
//   );
// }

// export default App;
