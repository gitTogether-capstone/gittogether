import React, { useState } from 'react';
import './SearchDropdown.css';
import supabase from '../../../client';
import { Link } from 'react-router-dom';

const SearchDropdown = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState([]);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    setMessage('');
    setSearchTerm(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.rpc('search_all_users', {
      search_term: searchTerm,
    });
    if (!error) {
      if (data.length === 0) {
        setMessage('No users found');
      } else {
        setResults(data);
      }
      setSearchTerm('');
    }
  };

  return (
    <div className="search-box">
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Search users"
          onChange={handleChange}
          value={searchTerm}
        />
        <button type="submit" id="search-button">
          Go
        </button>
      </form>
      <div className="search-results">
        {results.length
          ? results.map((user) => {
              return (
                <div className="result">
                  <img src={user.imageUrl} className="user-image" />
                  <Link to={`/user/${user.username}`}>
                    <p>@{user.username}</p>
                  </Link>
                </div>
              );
            })
          : null}
      </div>
      <p>
        <em>{message}</em>
      </p>
    </div>
  );
};

export default SearchDropdown;
