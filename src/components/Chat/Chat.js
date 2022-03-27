import React from "react";
import Conversations from "./TeamConvo/TeamConvo";
import "./chat.scss";
import Messages from "./Messages/Messages";
import Private from "./PrivateConvo/Private";

export default function Chat() {
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
          <Conversations />
          <Conversations />
        </div>
      </div>
      <div className="chat-box">
        <div className="wrapper-chat-box">
          <div className="chatBoxTop">
            <Messages />
            <Messages own={true} />
            <Messages />
            <Messages />
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
          ></textarea>
          <button className="chatSubmitButton">Send</button>
        </div>
        </div>
      </div>
      <div className="private-convo">
        <div className="wrapper private-convo">
          <Private />
          <Private />
          <Private />
          <Private />
          <Private />
          </div>
      </div>
    </div>
  );
}
