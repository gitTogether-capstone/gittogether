import React, { useState, useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./teamConvo.scss";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import supabase from "../../../client";
import { fetchConversations} from "../../../store/conversations";
import { fetchSingleConvo } from "../../../store/convoId";

export default function Conversations() {
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  const conversations = useSelector((state) => state.conversations);

  useEffect(() => {
    dispatch(fetchConversations(currentUser.id))
  },[])

  return (
    <div>
      {conversations.length < 1 ? (
        <span>No conversations currently! Start or join a team to start a chat!</span>
      ) : (
        conversations.map((convo) => {
          return (
        <div className="conversations"
             key={convo.id}
            onClick={() =>
            dispatch(fetchSingleConvo(convo.conversation.conversation_id))
            }
              >
          <GroupsIcon />
          <span>{convo.conversation.conversation_name}</span>
          <br />
        </div>
          )
        })
      )}
    </div>
  );
}

//CREATE CONVERSATION button then TAKE CONVERSATION ID from this input row and put it into the fetch field for the CREATE GROUP
// create group button where the conversation members match the members in this group
//input to put usernames in group (finding userids that match username insert row into conversation where conversation id
// same conversation members id mutliple user ids going into it
//CREATE CONVERSATION MEMBERS ROW WITH SAME CONVERSATION ID WITH MUTIPLE USER IDS
//matches on both user ids going in
//fetch all messages where conversation id

//GROUP IS ALREADY MADE IN PROJECT USERS NOT CREATING A NEW GROUP.
//BUTTON THAT TAKES PROJECT USERS AND MAKES A CONVERSATION GROUP ROW WITH IT
