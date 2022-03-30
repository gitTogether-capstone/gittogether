import './App.css';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Routes from './Routes';
import Navbar from './components/navbar/Navbar';
import supabase from './client';
import { setUser, signOut } from './store/user';
import { useHistory } from 'react-router-dom';

function App() {
  const history = useHistory();
  const [session, setSession] = useState(null);

  useEffect(() => {
    let user = supabase.auth.session();
    setSession(user);
  }, []);

  useEffect(() => {
    window.addEventListener('hashchange', () => {
      history.push('/');
    });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Routes session={session} />
    </div>
  );
}

export default App;
