import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setUser, signOut } from "../../store/user";
import { Link } from "react-router-dom";
import supabase from "../../client";
import "./navbar.scss";
import AddIcon from "@mui/icons-material/Add";
import Login from "../Login";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div id="navBar">
      <div className="wrapper">
        <div id="leftNav">
          <Link to="/" className="logo">
            gitTogether
          </Link>
        </div>
          <div id="rightNav">
            {user?.id ? (
              <>
                <div className="itemContainer">
                  <span>Messages</span>
                </div>
                <div className="itemContainer">
                  <Link to="/addProject">
                    <AddIcon className="icon" />
                  </Link>
                </div>
                <Link
                  to={`/user/${user.identities[0]["identity_data"].user_name}`}
                  className="profilePic"
                >
                  <img src={user.user_metadata.avatar_url} alt="profile" />
                </Link>
                <button className="logoutButton" onClick={logout}>
                  Sign Out
                </button>
              </>
            ) : (
              <Link to="/login">
                <button className="loginButton">Login</button>
              </Link>
            )}
          </div>
      </div>
    </div>
  );
};

export default Navbar;
