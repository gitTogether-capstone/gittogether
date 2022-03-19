import "./App.css";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Routes from "./Routes";
import Navbar from "./components/navbar/Navbar";
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
      <Navbar />
      <Routes />
    </div>
  );
}

export default App;
