import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Routes from "./Routes";
import Navbar from "./components/navbar/Navbar";
import supabase from "./client";
import { setUser } from "./store/user";
import { useHistory } from "react-router-dom";

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
      history.push("/projects");
    });
  }, []);

  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };
  return (
    <div className="App">
      <Navbar />
      {/* <Routes /> */}
      <Routes session={session} />
    </div>
  );
}

export default App;
