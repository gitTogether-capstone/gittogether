import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import Routes from './Routes';
import supabase from './client';
import { setUser } from './store/user';

function App() {
  const dispatch = useDispatch();

  const [session, setSession] = useState(null);

  useEffect(() => {
    let user = supabase.auth.session();
    setSession(user);
  }, []);

  useEffect(() => {
    checkUser();
    window.addEventListener('hashchange', () => {
      checkUser();
    });
  }, []);

  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };
  return (
    <div className="App">
      <Routes session={session} />
    </div>
  );
}

export default App;
