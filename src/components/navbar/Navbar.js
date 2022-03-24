import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setUser, signOut } from '../../store/user';
import { Link } from 'react-router-dom';
import './navbar.scss';
import AddIcon from '@mui/icons-material/Add';
import Notifications from './Notifications';
import DropdownMenu from './DropdownMenu/DropdownMenu.js';
import Popup from '../AddProject/Popup';
import { useState } from "react";

const Navbar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [buttonPopup, setButtonPopup] = useState(false);

  const logout = () => {
    dispatch(signOut());
  };

  return (
    <div className='navBar'>
      <div className='leftNav'>
        <Link to='/' className='logo'>
          gitTogether
        </Link>
      </div>
      {user?.id ? (
        <div className='rightNav'>
          <div className='itemContainer'>
            <span>Messages</span>
          </div>
          <div className='itemContainer'>
            <button onClick={() => setButtonPopup(true)}>+</button>
            <Popup trigger={buttonPopup} setTrigger={setButtonPopup}></Popup>
          </div>
          <div className='itemContainer'>
            {/* <NotificationsIcon sx={{ fontSize: 30 }} /> */}
            <Notifications>
              <DropdownMenu user={user} />
            </Notifications>
          </div>
          <div className='img-div'>
            <Link to={`/user/${user.identities[0]["identity_data"].user_name}`}>
              <img
                className='profilePic'
                src={user.user_metadata.avatar_url}
                alt='profile'
              />
            </Link>{" "}
          </div>
          <div className='button-div'>
            <button className='logButton' onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      ) : (
        <Link to='/login'>
          <button className='logButton'>Login</button>
        </Link>
      )}
    </div>
  );
};

export default Navbar;
