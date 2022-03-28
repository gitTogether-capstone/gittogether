import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import supabase from "../../../client";
import { fetchMessages } from "../../../store/messages";
import "./messages.scss";

export default function Messages() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();

  useEffect(() => {

  }, [])

  return (
    <div className="messages">
      <div className="messagesTop">
        <img
          className="messagesImg"
          src="https://cdn.fanbyte.com/wp-content/uploads/2020/05/picture3-2-scaled.jpg?x60655"
          alt=""
          //conversation_member.user_id.imageUrl
        />
        <p className='messagesText'>
          I Will Never Be a Memory
          I Will Never Be a Memory
          {/* messages.conversation_id.content */}
          </p>
      </div>
      <div className='messagesBottom'>
        1 hr ago
        {/* message.created_at */}
        </div>
    </div>
  );
}
