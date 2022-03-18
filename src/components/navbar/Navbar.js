import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../../store/user";
import { Link } from "react-router-dom";
import supabase from "../../client";
import "./navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import Login from "../Login";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };

  return (
    <div id="navBar">
      <div className="wrapper">
      <div id="leftNav">
        <Link to="/" className="logo">gitTogether</Link>
        <div className="itemContainer">
          <span>Browse Ideas</span>
        </div>
        <div className="itemContainer">
          <span>Messages</span>
        </div>
      </div>
      <div id="rightNav">
        <div className="itemContainer">
          <AddIcon className="icon" />
        </div>
        <div className="loginButton">
          <Link to="/login">Login</Link>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Navbar;
