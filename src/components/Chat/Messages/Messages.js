import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import supabase from "../../../client";
import { fetchMessages, addMessage } from "../../../store/messages";
import { fetchDMContent, addDM } from "../../../store/dmContent";
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
    dispatch(fetchDMContent(currentUser.id, dmId));
  }, []);

  useEffect(() => {
    if (convoId) {
      const handleMessagesInsert = async (payload) => {
        if (payload.new.conversation_id === convoId) {
          console.log("This is inside the if statement");
          let { data: messages } = await supabase
            .from("messages")
            .select(
              `
        *,
        user (
          id, imageUrl
        )
        `
            )
            .eq("id", payload.new.id);
          dispatch(addMessage(messages[0]));
        }
      };
      const messages = supabase
        .from("messages")
        .on("INSERT", handleMessagesInsert)
        .subscribe();
    }
  }, [convoId]);

  useEffect(() => {
    console.log("This is currentUser.id: ", currentUser.id);
    console.log("This is dmId: ", dmId);
    if (dmId) {
      const handleDirectMessagesInsert = async (payload) => {
        console.log("This is inside if statement: ", payload);
        if (
          (payload.new.sender_Id === currentUser.id ||
            payload.new.receiver_Id === currentUser.id) &&
          (payload.new.sender_Id === dmId || payload.new.receiver_Id === dmId)
        ) {
          const { data: directMessages, error } = await supabase
            .from("directMessages")
            .select(
              `*,
        sender:user!directMessages_sender_Id_fkey(id, username, imageUrl),
    receiver: user!directMessages_receiver_Id_fkey(id, username, imageUrl)
    `
            )
            .eq("id", payload.new.id);
          dispatch(addDM(directMessages[0]));
        }
      };
      const directMessages = supabase
        .from("directMessages")
        .on("INSERT", handleDirectMessagesInsert)
        .subscribe();
    }
  }, [dmId]);

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
                return dmId !== message.receiver_Id &&
                  dmId !== message.sender_Id &&
                  currentUser.id !== message.receiver_Id &&
                  currentUser.id !== message.sender_Id ? null : (
                  <div className="messages" key={message.id}>
                    <div
                      className={
                        currentUser.id === message.sender_Id
                          ? "messagesTop-Own"
                          : "messagesTop"
                      }
                    >
                      {currentUser.id === message.sender_id ? null : (
                        <img
                          className="messagesImg"
                          src={message.sender.imageUrl}
                          alt=""
                        />
                      )}
                      <p
                        className={
                          currentUser.id === message.sender_Id
                            ? "messagesText-Own"
                            : "messagesText"
                        }
                      >
                        {message.content}
                      </p>
                    </div>
                    <div
                      className={
                        currentUser.id === message.sender_Id
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
      )}
    </div>
  );
}
