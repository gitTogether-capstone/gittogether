import React, { useEffect, useState } from "react";
import supabase from "../../../client";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const AdminUsers = (props) => {
  const [user, setUser] = useState([]);
  const currentUser = supabase.auth.user();
  const [current, setCurrent] = useState([]);
  const [isBanned, setIsBanned] = useState("");
  //const isBanned = useSelector((state) => state.user.isBanned);
  useEffect(() => {
    fetchCurrent();
  }, [currentUser]);

  useEffect(() => {
    setIsBanned();
  }, []);

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
  async function banUser() {
    let { user } = await supabase.from("user").select("isBanned");
    // .update({ isBanned: !isBanned });
    // if (error) {
    //   console.log("error", error);
    // }
    //setUser({ ...user, isBanned: !isBanned });
    setIsBanned(() => ({
      isBanned: !isBanned,
    }));
    toast("User has been banned!");
  }

  console.log("user", user);
  console.log("isBanned", isBanned);
  console.log("isBanned", isBanned);
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
                <button className='post-button' onClick={banUser}>
                  Ban USer
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminUsers;
