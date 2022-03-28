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
              <div className="messages"
              key={message.id}>
                <div className="messagesTop">
                  <img
                    className="messagesImg"
                    src={message.user.imageUrl}
                    alt=""
                  />
                  <p className="messagesText">{message.content}</p>
                </div>
                <div className="messagesBottom">
                {message.created_at}
                </div>
              </div>
            );
          })}
    </div>
  );
}
