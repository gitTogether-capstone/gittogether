import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes';
import Navbar from './components/navbar/Navbar';
import supabase from './client';
import { setUser, signOut } from './store/user';
import { useHistory } from 'react-router-dom';
import { Octokit } from '@octokit/core';

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const user = useSelector((state) => state.user);
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
    dispatch(setUser(user));
  };

  return (
    <div className="App">
      <Navbar />
      <Routes session={session} />
    </div>
  );
}

export default App;
