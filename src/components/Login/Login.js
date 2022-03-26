import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { login, signOut, setUser } from '../../store/user';
import supabase from '../../client';
import { Link } from 'react-router-dom';
import './login.scss';
import Footer from '../Footer/Footer';

const Login = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const signInWithGithub = () => {
    dispatch(login());
  };

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div className="login" style={{ marginTop: 200 }}>
      {user && user.id ? (
        <div>
          <img src={user.user_metadata.avatar_url} alt="profile" />
          <h1>{user.email}</h1>
          <Link to="/">Projects</Link>
          <button onClick={logout}>Signout</button>
        </div>
      ) : (
        <>
          <div className="signin-button-div">
            <button onClick={signInWithGithub} className="signIn-button">
              Sign In With GitHub
            </button>
          </div>
          <Footer />
        </>
      )}
    </div>
  );
};

export default Login;
