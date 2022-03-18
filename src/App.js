import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "./Routes";
import supabase from "./client";
import { setUser } from "./store/user";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    checkUser();
    window.addEventListener("hashchange", () => {
      checkUser();
    });
  }, []);

  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };
  return (
    <div className="App">
      <Routes />
    </div>
  );
}

export default App;
