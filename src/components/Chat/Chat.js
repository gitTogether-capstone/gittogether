import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Conversations from "./TeamConvo/TeamConvo";
import "./chat.scss";
import Messages from "./Messages/Messages";
import Private from "./PrivateConvo/Private";
import supabase from "../../client";
import { addMessage } from "../../store/messages";

export default function Chat() {
  const [convoId, setConvoId] = useState("");
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  async function handleSend() {
    let currentUser = supabase.auth.user();
    let message = textAreaRef.current.value;
    const { data } = await supabase
      .from("messages")
      .insert([
        { content: message, sender_id: currentUser.id, conversation_id: "1" },
      ]);
    dispatch(addMessage(data[0]));
  }

  return (
    <div className="chat">
      <div className="team-convo">
        <div className="wrapper-team-convo">
          <div className="team-header">
            Teams
            <div>
              <hr />
            </div>
          </div>
          <Conversations />
        </div>
      </div>
      <div className="chat-box">
        <div className="wrapper-chat-box">
          <div className="chatBoxTop">
            <div ref={scrollRef}>
              <Messages />
            </div>
          </div>
          <div className="chatBoxBottom">
            <textarea
              className="chatMessageInput"
              placeholder="text here..."
              ref={textAreaRef}
            ></textarea>
            <button className="chatSubmitButton" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className="private-convo">
        <div className="wrapper private-convo">
          <Private />
          <Private />
        </div>
      </div>
    </div>
  );
}
