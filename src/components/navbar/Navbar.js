import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, signOut } from '../../store/user';
import { Link } from 'react-router-dom';
import supabase from '../../client';
import './navbar.scss';
import AddIcon from '@mui/icons-material/Add';
import Login from '../Login';

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const checkUser = () => {
    const user = supabase.auth.user();
    dispatch(setUser(user));
  };

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
          <div className="itemContainer">
            <span>Browse Ideas</span>
          </div>
          <div className="itemContainer">
            <span>Messages</span>
          </div>
        </div>
        <div id="rightNav">
          <div className="itemContainer">
            <Link to="/addProject">
              <AddIcon className="icon" />
            </Link>
          </div>
          <div>
            {user && user.id ? (
              <>
                <Link
                  to={`/user/${user.identities[0]['identity_data'].user_name}`}
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
    </div>
  );
};

export default Navbar;
