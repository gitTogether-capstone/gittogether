import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../../client";
import { NavLink, Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.from("user").select("*");
      console.log("data", { data });
      setUser(data);
    }
    fetchUser();
  }, []);

  return !user ? (
    <div>Loading users...</div>
  ) : (
    <div>
      <br />
      <br />
      <div className="admin">
        {user.map((use) => (
          <div key={use.id} className="users">
            <Link to={`/user/:userId`}></Link>
            <br />
            <div> Username: {use.username} </div>
            <br />
            <div> Bio: {use.bio} </div>
          </div>
        ))}
      </div>
    </div>
    // <div>Hello World!</div>
  );
};

export default Admin;
