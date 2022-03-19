import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import Navbar from './components/navbar/Navbar';
import supabase from './client';
import { setUser } from './store/user';
import { useHistory } from 'react-router-dom';
import { Octokit } from '@octokit/core';


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
    window.addEventListener('hashchange', () => {
      checkUser();
      history.push('/');
    });
  }, []);

  const checkUser = async () => {
    const user = supabase.auth.user();
    const userSession = supabase.auth.session();

    if (user) {
      let { data, err } = await supabase
        .from('user')
        .select('*')
        .eq('id', user.id);
      if (data.length === 0) {
        let { data, err } = await supabase
          .from('user')
          .insert([{ id: user.id }]);
        const octokit = new Octokit({
          auth: userSession.provider_token,
        });
        let repoqueries = [];
        let page = 1;
        let langquery = await octokit.request(
          `GET /user/repos?per_page=100&page=${page}`,
          {
            sort: 'full_name',
          }
        );
        repoqueries.push(
          ...langquery.data.filter((repo) => repo['node_id'].length === 12)
        );
        page = page + 1;
        while (langquery.headers.link.includes('next')) {
          langquery = await octokit.request(
            `GET /user/repos?per_page=100&page=${page}`,
            {
              sort: 'full_name',
            }
          );
          repoqueries.push(
            ...langquery.data.filter((repo) => repo['node_id'].length === 12)
          );
        }

        let languages = {};
        for (let i = 0; i < repoqueries.length; i++) {
          if (languages[repoqueries[i].language]) {
            languages[repoqueries[i].language] =
              languages[repoqueries[i].language] + 1;
          } else {
            languages[repoqueries[i].language] = 1;
          }
        }
        let langkeys = Object.keys(languages);
        for (let i = 0; i < langkeys.length; i++) {
          //search for language
          let { data, err } = await supabase.from('languages').select('*');

          let languages = [];
          let langvalues = Object.values(data);
          for (let i = 0; i < langvalues.length; i++) {
            if (langvalues[i].name !== null) {
              languages.push(langvalues[i].name);
            }
          }

          if (!languages.includes(langkeys[i]) && langkeys[i] !== 'null') {
            //if language not in database

            let { data, error } = await supabase
              .from('languages')
              .insert([{ name: `${langkeys[i]}` }]);
            let { langdata, err } = await supabase
              .from('languages')
              .select('*')
              .eq('name', `${langkeys[i]}`);

            let { dataa, errr } = await supabase
              .from('userLanguages')
              .insert([{ languageId: langdata.id, userId: user.id }]);
          } else if (langkeys[i] !== 'null') {
            let language = data.filter((lang) => lang.name === langkeys[i]);

            let { newdata, err } = await supabase
              .from('userLanguages')
              .insert([{ languageId: language[0].id, userId: user.id }]);
          }
        }
      }
    }

    dispatch(setUser(user));
  };
  return (
    <div className="App">
      <Navbar />
      <Routes />
      <Routes session={session} />
    </div>
  );
}

export default App;
