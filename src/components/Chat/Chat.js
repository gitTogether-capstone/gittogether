import React, { useState, useRef, useEffect } from "react";
import { useDispatch } from "react-redux";
import Conversations from "./TeamConvo/TeamConvo";
import "./chat.scss";
import Messages from "./Messages/Messages";
import Private from "./PrivateConvo/Private";
import supabase from "../../client";

export default function Chat() {
const [textArea, setTextArea] = useState('');
const textAreaRef = useRef(null);

useEffect(() => {
}, []);

async function handleSend() {
  let currentUser = supabase.auth.user();
  let message = textAreaRef.current.value;
  const { data } = await supabase
    .from('messages')
    .insert([
      { content: message, sender_id: currentUser.id, conversation_id: '1' },
    ])
};

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
          <Conversations
          //onClick={}
          />
          <Conversations />
          <Conversations />
        </div>
      </div>
      <div className="chat-box">
        <div className="wrapper-chat-box">
          <div className="chatBoxTop">
            <Messages />
            <Messages />
            <Messages />
            <Messages />
            <Messages />
          </div>
        <div className="chatBoxBottom">
          <textarea
            className="chatMessageInput"
            placeholder="text here..."
            ref={textAreaRef}
          ></textarea>
          <button
          className="chatSubmitButton"
          onClick={handleSend}
          >Send</button>
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
