import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

const SearchBox = (props) => {
  const { open, openSearch, openNotifications } = props;

  const handleClick = () => {
    openSearch(!open);
    openNotifications(false);
  };

  return (
    <div>
      <SearchIcon className="icon" onClick={handleClick} />
      {open && props.children}
    </div>
  );
};

export default SearchBox;
