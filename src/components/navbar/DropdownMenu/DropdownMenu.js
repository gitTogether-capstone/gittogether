import React, { useEffect, useState } from 'react';
import './DropdownMenu.css';
import supabase from '../../../client';
import { fetchProjectRequests } from '../../../util';
import DropdownMenuItem from './DropdownMenuItem';
import { CSSTransition } from 'react-transition-group';
import NotificationOptions from './NotificationOptions';

const DropdownMenu = (props) => {
  const { user } = props;
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState('No notifications');
  const [activeMenu, setActiveMenu] = useState('main');
  const [selectedNotification, setSelectedNotification] = useState({});
  const [menuHeight, setMenuHeight] = useState(null);

  const calcHeight = (el) => {
    let height = notifications.length * 100 + 100;
    setMenuHeight(height);
  };

  useEffect(() => {
    const getProjects = async () => {
      const requests = await fetchProjectRequests(user.id);
      if (requests.length === 0) {
        setMessage('No notifications');
      } else {
        setMenuHeight(requests.length * 100 + 100);
        setNotifications(requests);
      }
    };
    getProjects();
  }, []);

  return (
    <div className="dropdown" style={{ height: menuHeight }}>
      <CSSTransition
        in={activeMenu === 'main'}
        unmountOnExit
        timeout={500}
        classNames="menu-primary"
        onEnter={calcHeight}
      >
        <div className="menu">
          <h2>Notifications</h2>
          {notifications.length ? (
            notifications.map((notification) => {
              return (
                <DropdownMenuItem
                  notification={notification}
                  handleClick={() => {
                    setSelectedNotification(notification);
                    setActiveMenu('secondary');
                  }}
                  key={notification.id}
                />
              );
            })
          ) : (
            <p>
              <em>{message}</em>
            </p>
          )}
        </div>
      </CSSTransition>
      <CSSTransition
        in={activeMenu === 'secondary'}
        unmountOnExit
        timeout={500}
        classNames="menu-secondary"
        onEnter={() => setMenuHeight(300)}
      >
        <NotificationOptions
          notification={selectedNotification}
          handleClick={() => setActiveMenu('main')}
          allNotifications={notifications}
          setNotifications={setNotifications}
        />
      </CSSTransition>
    </div>
  );
};

export default DropdownMenu;
