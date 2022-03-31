import React, { useEffect, useState } from "react";
import supabase from "../../client";
import { useHistory } from "react-router-dom";
import { fetchSingleDM } from "../../store/dmId";
import { useDispatch, useSelector } from "react-redux";
import UserProfile from "./UserProfile";
import "./FirstMessage.css";

function FirstMessage(props) {
  const [content, setContent] = useState({ body: "" });
  const [directMessages, setDirectMessages] = useState([]);
  const [user, setUser] = useState([]);
  const { body } = content;
  const currentUser = supabase.auth.user();
  const dispatch = useDispatch();
  const history = useHistory();
  //const user = props.match.params.userId;

  async function createDirectMessages(user) {
    const { data, error } = await supabase.from("directMessages").insert([
      {
        sender_Id: currentUser.id,
        receiver_Id: props.userId,
        content: body,
      },
    ]);
    if (error) console.log("ERROR", error);
    setContent({ content: "" });
    dispatch(fetchSingleDM(props.userId));
    history.push("/chat");
  }
  console.log("userrrrr", user);
  console.log("props", props);
  return (
    <div className='flex-container'>
      <div className='flex-tile'>
        <input
          id='comment-input'
          placeholder='Message text here'
          value={body}
          onChange={(e) => setContent({ ...content, body: e.target.value })}
        />
        <br />
        <button className='post-button' onClick={createDirectMessages}>
          Post
        </button>
      </div>
    </div>
  );
}

export default FirstMessage;
