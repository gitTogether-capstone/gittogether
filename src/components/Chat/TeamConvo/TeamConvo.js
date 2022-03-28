import React, { useState, useRef, useEffect } from "react";
import "./teamConvo.scss";
import GroupsIcon from "@mui/icons-material/GroupsOutlined";
import supabase from "../../../client";

export default function Conversations() {
  const [conversation, setConversation] = useState([]);
  const { conversation_name } = conversation;
  //CREATE CONVERSATION button then TAKE CONVERSATION ID from this input row and put it into the fetch field for the CREATE GROUP
  // create group button where the conversation members match the members in this group
  //input to put usernames in group (finding userids that match username insert row into conversation where conversation id
  // same conversation members id mutliple user ids going into it
  //CREATE CONVERSATION MEMBERS ROW WITH SAME CONVERSATION ID WITH MUTIPLE USER IDS
  //matches on both user ids going in
  //fetch all messages where conversation id

  //GROUP IS ALREADY MADE IN PROJECT USERS NOT CREATING A NEW GROUP.
  //BUTTON THAT TAKES PROJECT USERS AND MAKES A CONVERSATION GROUP ROW WITH IT

  return (
    <div className='conversations'>
      <GroupsIcon />
      <span>Team Name</span>
      <br />
    </div>
  );
}
