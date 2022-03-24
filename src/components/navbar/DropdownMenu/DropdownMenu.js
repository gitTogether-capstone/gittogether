import React, { useEffect, useState } from 'react';
import './DropdownMenu.css';
import supabase from '../../../client';
import { fetchProjectRequests } from '../../../util';
import DropdownMenuItem from './DropdownMenuItem';

const DropdownMenu = (props) => {
  const { user } = props;
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const requests = await fetchProjectRequests(user.id);

      setNotifications(requests);
    };
    getProjects();
  }, []);

  console.log('notifications', notifications);

  return (
    <div className="dropdown">
      <h2>Notifications</h2>
      {notifications.length ? (
        notifications.map((notification) => {
          return <DropdownMenuItem notification={notification} />;
        })
      ) : (
        <p>
          <em>No new notifications</em>
        </p>
      )}
    </div>
  );
};

export default DropdownMenu;
