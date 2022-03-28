import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../client";
import messages, { fetchMessages } from "../../../store/messages";
import "./messages.scss";

export default function Messages() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  let convoId = 1;

  useEffect(() => {
    dispatch(fetchMessages(convoId));
  }, [convoId]);

  let messages = useSelector((state) => state.messages);

  return (
    <div>
      {messages.length < 1
        ? "Start a chat!"
        : messages.map((message) => {
            return (
              <div className="messages">
                <div className="messagesTop">
                  <img
                    className="messagesImg"
                    src="https://cdn.fanbyte.com/wp-content/uploads/2020/05/picture3-2-scaled.jpg?x60655"
                    alt=""
                    //conversation_member.user_id.imageUrl
                  />
                  <p className="messagesText">{message.content}</p>
                </div>
                <div className="messagesBottom">
                  1 hr ago
                  {/* message.created_at */}
                </div>
              </div>
            );
          })}
    </div>
  );
}
