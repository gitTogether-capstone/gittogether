import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';

const Notifications = (props) => {
  const { open, openNotifications, openSearch } = props;
  const handleClick = () => {
    openNotifications(!open);
    openSearch(false);
  };

  return (
    <div>
      <a onClick={handleClick} className="icon-link">
        <NotificationsIcon sx={{ fontSize: 30 }} className="icon" />
      </a>
      {open && props.children}
    </div>
  );
};

export default Notifications;
