import React from 'react';
import { Octokit } from '@octokit/core';
import supabase from './client';
async function fetchLanguages() {
  const userSession = supabase.auth.session();
  if (userSession.user) {
    //grab user from DB

    if (!userSession.provider_token) {
      alert('Your session has expired. Please log in again.');
      return;
    }
    let { data, err } = await supabase
      .from('user')
      .select('*')
      .eq('id', userSession.user.id);

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
        sort: 'full_name',
      }
    );

    //filter nodeids to avoid duplicates github API sends back
    repoqueries.push(
      ...langquery.data.filter(
        (repo) => repo['node_id'].includes('=') === false
      )
    );
    page = page + 1;
    //while you aren't on the last or only page
    if (langquery.headers.link) {
      while (langquery.headers.link.includes('next')) {
        //request again with incremented page count
        langquery = await octokit.request(
          `GET /user/repos?per_page=100&page=${page}`,
          {
            sort: 'full_name',
          }
        );

        repoqueries.push(
          ...langquery.data.filter(
            (repo) => repo['node_id'].includes('=') === false
          )
        );
        page = page + 1;
      }
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
      let { data, err } = await supabase.from('languages').select('*');

      let languages = [];
      let langvalues = Object.values(data);
      //loop through languages and put name of them in an array
      for (let i = 0; i < langvalues.length; i++) {
        if (langvalues[i].name !== null) {
          languages.push(langvalues[i].name);
        }
      }

      //if language not in database and isn't null(comes out as a string)
      if (
        !languages.includes(langkeys[i]) &&
        langkeys[i] !== 'null' &&
        langkeys[i] !== 'HTML' &&
        langkeys[i] !== 'CSS'
      ) {
        //insert language into DB
        let { data, error } = await supabase
          .from('languages')
          .insert([{ name: `${langkeys[i]}` }]);
        //grab language to get its ID
        let { langdata, err } = await supabase
          .from('languages')
          .select('*')
          .eq('name', `${langkeys[i]}`);
        let userLangs = await supabase
          .from('userLanguages')
          .select('*')
          .eq('userId', userSession.user.id);
        let usersLanguages;
        // if user has any languages, grab them and see if they already have this language
        if (userLangs.data) {
          usersLanguages = userLangs.data.reduce((accum, language) => {
            accum.push(language.languageId);
            return accum;
          }, []);
          let language = data.filter((lang) => lang.name === langkeys[i]);
          if (!usersLanguages.includes(language[0].id)) {
            //insert users language into userLanguages
            let { dataa, errr } = await supabase
              .from('userLanguages')
              .insert([
                { languageId: langdata.id, userId: userSession.user.id },
              ]);
          }
        }
        //if language exists in DB and isn't null
      } else if (
        langkeys[i] !== 'null' &&
        langkeys[i] !== 'HTML' &&
        langkeys[i] !== 'CSS'
      ) {
        //filter current language out of list of languages fetched earlier
        let language = data.filter((lang) => lang.name === langkeys[i]);

        let usersLanguagesInDb = await supabase
          .from('userLanguages')
          .select('*')
          .eq('userId', userSession.user.id);
        let usersLanguages;
        if (usersLanguagesInDb.data) {
          usersLanguages = usersLanguagesInDb.data.reduce((accum, language) => {
            accum.push(language.languageId);
            return accum;
          }, []);
          console.log(usersLanguages);
          console.log(language);
          console.log(langkeys[i]);
          if (!usersLanguages.includes(language[0].id)) {
            // insert users language into userLanguages
            let { newdata, err } = await supabase
              .from('userLanguages')
              .insert([
                { languageId: language[0].id, userId: userSession.user.id },
              ]);
          }
        }
      }
    }
  }
}

export default fetchLanguages;
