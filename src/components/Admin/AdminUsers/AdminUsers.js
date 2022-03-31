import React, { useEffect, useState } from "react";
import supabase from "../../../client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const AdminUsers = (props) => {
  const [user, setUser] = useState([]);
  const currentUser = supabase.auth.user();
  const [current, setCurrent] = useState([]);

  useEffect(() => {
    fetchCurrent();
  }, [currentUser]);

  useEffect(() => {
    async function fetchUser() {
      const { data } = await supabase.from("user").select("*");
      console.log("data", { data });
      setUser(data);
    }
    fetchUser();
  }, []);

  async function fetchCurrent() {
    if (currentUser) {
      const { data } = await supabase
        .from("user")
        .select("*")
        .eq("id", currentUser.id);
      setCurrent(data);
    }
  }

  //   const handleDelete = (e) => {
  //     console.log("YOU BANNED");
  //   };
  console.log("current", current);
  console.log("currentUser", currentUser);
  return current.length === 0 ? null : !current[0].isAdmin ? null : !user ? (
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
                    Ban USer
                  </button> */}
                <button className='post-button'>Ban User</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
