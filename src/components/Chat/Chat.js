import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Conversations from './TeamConvo/TeamConvo';
import './chat.scss';
import Messages from './Messages/Messages';
import Private from './PrivateConvo/Private';
import supabase from '../../client';

export default function Chat() {
  const currentUser = supabase.auth.user();
  const convoId = useSelector((state) => state.convoId);
  const [chatToggle, setChatToggle] = useState(false);
  const dispatch = useDispatch();
  const textAreaRef = useRef(null);
  const [newMessage, setNewMessage] = useState(false);
  let receiverId = useSelector((state) => state.dmId);

  async function handleSend() {
    let message = textAreaRef.current.value;
    if (!chatToggle) {
      const { data } = await supabase.from('messages').insert([
        {
          content: message,
          sender_id: currentUser.id,
          conversation_id: convoId,
        },
      ]);
    } else {
      const { data } = await supabase.from('directMessages').insert([
        {
          content: message,
          sender_Id: currentUser.id,
          receiver_Id: receiverId,
        },
      ]);
    }
  }

  useEffect(() => {}, [newMessage]);

  return (
    <div className="chat">
      <div className="convo">
        <div className="wrapper-convo">
          <div className="convo-header">
            <span className="teams-header" onClick={() => setChatToggle(false)}>
              Teams
            </span>
            <span>|</span>
            <span className="dm-header" onClick={() => setChatToggle(true)}>
              Direct Messages
            </span>
          </div>
          <div>
          <hr />
          </div>
          {chatToggle === false ? <Conversations /> : <Private />}
        </div>
      </div>
      <div className="chat-box">
        <div className="wrapper-chat-box">
          <div className="chatBoxTop">
            <div>
              <Messages dmState={chatToggle} />
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
    </div>
  );
}
