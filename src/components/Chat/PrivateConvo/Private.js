import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../client";
import "./privateConvo.scss";
import { fetchDirectMessages } from "../../../store/directMessages";

export default function Private() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  const directMessages = useSelector((state) => state.directMessages)

  useEffect(() => {
    dispatch(fetchDirectMessages(currentUser.id))
  }, []);

  return (
    <div>
    {directMessages.length < 1 ? (
      <span>
        No direct messages currently!
      </span>
    ) : (
    <div className="privateConvo">
      <div className="privateConvo-user">
      <div className="privateConvo-img-container">
        <img
          className="privateConvo-img"
          src="https://cdn.fanbyte.com/wp-content/uploads/2020/05/picture3-2-scaled.jpg?x60655"
          alt=""
        />
        <div className='onlineBadge'></div>
      </div>
      <span className='username'>Sephiroth</span>
      </div>
    </div>
    )}
    </div>
  );
}
