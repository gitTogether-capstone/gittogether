import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./teamConvo.scss";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import supabase from "../../../client";
import { fetchConversations } from "../../../store/conversations";
import { fetchSingleConvo } from "../../../store/convoId";

export default function Conversations() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);
  let convoId = useSelector((state) => state.convoId);

  useEffect(() => {
    dispatch(fetchConversations(currentUser.id));
  }, []);

  return (
    <div>
      {conversations.length < 1 ? (
        <span>
          No conversations currently! Start or join a team to start a chat!
        </span>
      ) : (
        conversations.map((convo) => {
          return (
            <div
              className="conversations"
              key={convo.id}
              onClick={() =>
                dispatch(fetchSingleConvo(convo.conversation.conversation_id))
              }
            >
              <div className={convoId === convo.conversation.conversation_id ? "conversation-current-user" : "conversation"}>
              <GroupsIcon />
              <span>{convo.conversation.conversation_name}</span>
              <br />
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}
