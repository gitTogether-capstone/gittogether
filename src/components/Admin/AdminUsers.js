import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import supabase from "../../client";
import { Link } from "react-router-dom";
import "./Admin.css";
// import { setUser, setProjects } from "../../store";

const AdminUsers = () => {
  const [user, setUser] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.from("user").select("*");
      console.log("data", { data });
      setUser(data);
    }
    fetchUser();
  }, []);
  console.log("user", user);

  useEffect(() => {
    async function fetchProjects() {
      const { data } = await supabase.from("projects").select("*");
      console.log("data", { data });
      setProjects(data);
    }
    fetchProjects();
  }, []);

  // const handleDelete = (e) => {
  //   fetch user delete user
  // }
  return !user ? (
    <div>Loading users...</div>
  ) : (
    <div>
      <div>
        <br />
        <br />
        <div className='admin'>
          {user.map((use) => (
            <div key={use.id} className='users'>
              <Link to={`/user/:userId`}></Link>
              <img className='profile-picutre' src={use.imageUrl} />
              <br />
              <div> Username: {use.username} </div>
              <br />
              <div> Email: {use.email} </div>
              <br />
              <div> Bio: {use.bio} </div>
              <br />
              <div>
                {/* <button className='post-button' onClick={handleDelete}>
                Delete User
              </button> */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
    // <div>Hello World!</div>
  );
};

export default AdminUsers;
