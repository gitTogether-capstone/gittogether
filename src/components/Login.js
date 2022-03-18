import React, { useState, useEffect } from "react";
import supabase from "../client";

const Login = () => {
  const [user, setUser] = useState(null);

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
    setUser(user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    setUser({});
  };

  const checkUser = () => {
    const user = supabase.auth.user();
    setUser(user);
  };

  return (
    <div className="App">
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
