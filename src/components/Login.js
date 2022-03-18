import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { login, signOut, setUser } from "../store/user";
import supabase from "../client";
import { Link } from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const signInWithGithub = () => {
    dispatch(login());
  };

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div className="login">
      {user && user.id ? (
        <div>
          <img src={user.user_metadata.avatar_url} alt="profile" />
          <h1>{user.email}</h1>
          <Link to="/">Projects</Link>
          <button onClick={logout}>Signout</button>
        </div>
      ) : (
        <button onClick={signInWithGithub}>Signin with github</button>
      )}
    </div>
  );
};

export default Login;
