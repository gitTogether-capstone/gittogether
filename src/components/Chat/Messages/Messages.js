import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../client";
import { fetchMessages } from "../../../store/messages";
import { fetchDMContent } from "../../../store/dmContent";
import "./messages.scss";

export default function Messages({ dmState }) {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  const convoId = useSelector((state) => state.convoId);
  let messages = useSelector((state) => state.messages);
  let directMessages = useSelector((state) => state.dmContent);
  let dmId = useSelector((state) => state.dmId);

  useEffect(() => {
    dispatch(fetchMessages(convoId));
  }, [convoId]);

  useEffect(() => {
    dispatch(fetchDMContent(currentUser.id));
  }, []);

  console.log('This is dmId: ', dmId);

  return (
    <div>
      {dmState === false ? (
        <div>
          {messages.length < 1
            ? "Start a chat!"
            : messages.map((message) => {
                return (
                  <div className="messages" key={message.id}>
                    <div
                      className={
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
                    <div
                      className={
                        currentUser.id === message.sender_id
                          ? "messagesBottom-Own"
                          : "messagesBottom"
                      }
                    >
                      {message.created_at}
                    </div>
                  </div>
                );
              })}
        </div>
      ) : (
        <div>
          {directMessages.length < 1
            ? "Start a chat!"
            : directMessages.map((message) => {
                return (
                  (dmId !== message.receiver_Id && message.sender_Id
                 ? null
                 : <div className="messages" key={message.id}>
                    <div
                      className={
                        currentUser.id === message.sender_id
                          ? "messagesTop-Own"
                          : "messagesTop"
                      }
                    >
                      {/* {currentUser.id === message.sender_id ? null : (
                      <img
                        className="messagesImg"
                        src={message.user.imageUrl}
                        alt=""
                      />
                    )} */}
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
                    <div
                      className={
                        currentUser.id === message.sender_id
                          ? "messagesBottom-Own"
                          : "messagesBottom"
                      }
                    >
                      {message.created_at}
                    </div>
                  </div>
                  )
                );
              })}
        </div>
      )}
    </div>
  );
}
