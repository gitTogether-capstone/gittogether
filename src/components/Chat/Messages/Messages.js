import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../client";
import { fetchMessages } from "../../../store/messages";
import "./messages.scss";

export default function Messages() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  let convoId = 1;

  let messages = useSelector((state) => state.messages);

  useEffect(() => {
    dispatch(fetchMessages(convoId));
  }, []);

  return (
    <div>
      {messages.length < 1
        ? "Start a chat!"
        : messages.map((message) => {
            return (
              <div className="messages" key={message.id}>
                <div className={
                      currentUser.id === message.sender_id
                        ? "messagesTop-Own"
                        : "messagesTop"
                    }
                  >
                  {currentUser.id === message.sender_id ? null : (
                    <img
                      className="messagesImg"
                      src={message.user.imageUrl}
                      alt=""
                    />
                  )}
                  <p
                    className={
                      currentUser.id === message.sender_id
                        ? "messagesText-Own"
                        : "messagesText"
                    }
                  >
                    {message.content}
                  </p>
                </div>
                <div className={
                      currentUser.id === message.sender_id
                        ? "messagesBottom-Own"
                        : "messagesBottom"
                    }>{message.created_at}</div>
              </div>
            );
          })}
    </div>
  );
}
