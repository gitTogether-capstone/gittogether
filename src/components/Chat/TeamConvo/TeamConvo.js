import React from 'react';
import './teamConvo.scss';
import { Link } from 'react-router-dom';
import GroupsIcon from '@mui/icons-material/GroupsOutlined';

export default function Conversations() {
  return (
    <div className='conversations'>
      <GroupsIcon />
      <span>Team Name</span>
      </div>
  )
}

