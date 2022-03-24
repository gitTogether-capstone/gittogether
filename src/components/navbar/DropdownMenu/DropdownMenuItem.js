import React, { useState } from 'react';
import './DropdownMenu.css';
import supabase from '../../../client';

const DropdownMenuItem = ({ notification }) => {
  const [didAccept, setDidAccept] = useState(false);

  const handleClick = async () => {
    const { data, error } = await supabase
      .from('projectUser')
      .update({ isAccepted: true })
      .eq('projectId', notification.projects.id)
      .eq('userId', notification.user.id);
    if (error) {
      console.log(error);
    } else {
      console.log('response', data);
      setDidAccept(true);
    }
  };

  return (
    <div className="notification-item">
      <img src={notification.user.imageUrl} />
      <p>
        <strong>@{notification.user.username}</strong> wants to join{' '}
        <strong>{notification.projects.name}</strong>
      </p>
      {didAccept ? (
        <p className="response-message">
          <strong>Success!</strong>
        </p>
      ) : (
        <button onClick={handleClick}>Accept</button>
      )}
    </div>
  );
};

export default DropdownMenuItem;
