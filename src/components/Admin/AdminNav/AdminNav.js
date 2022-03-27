import React, { useState } from "react";
import { Link } from "react-router-dom";
import AdminPopup from "../AdminAdd/AdminPopup";
import "./AdminNav.css";

const AdminNav = (props) => {
  const [buttonPopup, setButtonPopup] = useState(false);
  return (
    <div>
      <nav>
        <h2>Hello Admin User</h2>
        <div className='display-flex'>
          <div className='admin-tiles'>
            <Link to='/adminUsers'>Users</Link>
          </div>
          <div className='admin-tiles'>
            <Link to='/adminProjects'>Projects</Link>
          </div>
        </div>
      </nav>
      <main>
        <div className='display-flex'>
          <button onClick={() => setButtonPopup(true)}>Add Language</button>
          <AdminPopup trigger={buttonPopup} setTrigger={setButtonPopup}>
            <h4>Add Language</h4>
          </AdminPopup>
        </div>
      </main>
    </div>
  );
};

export default AdminNav;
