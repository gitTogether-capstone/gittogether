import React, { useState } from 'react';
import NotificationsIcon from '@mui/icons-material/NotificationsOutlined';

const Notifications = (props) => {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <a href="#" onClick={() => setOpen(!open)} className="icon-link">
        <NotificationsIcon sx={{ fontSize: 30 }} />
      </a>
      {open && props.children}
    </div>
  );
};

export default Notifications;
