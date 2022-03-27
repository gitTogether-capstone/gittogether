import React, { useEffect, useState } from "react";
import supabase from "../../client";
import { Link } from "react-router-dom";
import "./Admin.css";

const AdminUsers = () => {
  const [user, setUser] = useState([]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.from("user").select("*");
      console.log("data", { data });
      setUser(data);
    }
    fetchUser();
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

              <div>
                {/* <button className='post-button' onClick={handleDelete}>
                  Delete User
                </button> */}
                <button className='post-button'>Delete User</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
