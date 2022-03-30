import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../client";
import "./privateConvo.scss";
import { fetchDMUsers } from "../../../store/dmUsers";
import { fetchSingleDM } from "../../../store/dmId";
import { fetchDMContent } from "../../../store/dmContent";

export default function Private() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  const dmUsers = useSelector((state) => state.dmUsers);

  useEffect(() =>  {
    dispatch(fetchDMUsers(currentUser.id));
  }, []);

  return (
    <div>
      {dmUsers.length < 1 ? (
        <span>No direct messages currently!</span>
      ) : (
        dmUsers.map((user) => {
          return (
            <div className="privateConvo"
            key={user.id}
            onClick={() => {dispatch(fetchDMContent(currentUser.id, user.id))
            dispatch(fetchSingleDM(user.id))}}
            >
              <div className="privateConvo-user">
                <div className="privateConvo-img-container">
                  <img
                    className="privateConvo-img"
                    src={user.imageUrl}
                    alt=""
                  />
                  <div className="onlineBadge"></div>
                </div>
                <span className="username">{user.username}</span>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
