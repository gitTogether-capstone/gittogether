import React from 'react';
import './NotFound.css';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div>
      <h1 id="header">404</h1>
      <h2 id="sub-header">You look lost...</h2>
      <Link to="/">
        <button id="back-home">Let's go Home</button>
      </Link>
    </div>
  );
};

export default NotFound;
