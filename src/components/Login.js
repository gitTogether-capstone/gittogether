import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/user";
import supabase from "../client";

const Login = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  const signInWithGithub = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: "github",
    });
    dispatch(setUser(user));
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    dispatch(setUser({}));
  };

  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };

  return (
    <div className="login">
      {user && user.id ? (
        <div>
          <img src={user.user_metadata.avatar_url} alt="profile" />
          <h1>{user.email}</h1>
          <button onClick={signOut}>Signout</button>
        </div>
      ) : (
        <button onClick={signInWithGithub}>Signin with github</button>
      )}
    </div>
  );
};

export default Login;
