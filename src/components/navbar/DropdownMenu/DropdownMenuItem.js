import React, { useState } from 'react';
import './DropdownMenu.css';
import supabase from '../../../client';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const DropdownMenuItem = ({ notification, handleClick }) => {
  const [didAccept, setDidAccept] = useState(false);

  return (
    <div className="notification-item">
      <img src={notification.user.imageUrl} />
      <p>
        <strong>@{notification.user.username}</strong> wants to join{' '}
        <strong>{notification.projects.name}</strong>
      </p>
      <ArrowForwardIosIcon className="icon" onClick={handleClick} />
    </div>
  );
};

export default DropdownMenuItem;
