import React, { useEffect, useState } from "react";
import supabase from "../../../client";
import { useHistory } from "react-router-dom";
import { fetchSingleDM } from "../../../store/dmId";
import { useDispatch, useSelector } from "react-redux";
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

  return (
    <div className='new-language-form'>
      <div className='form-element'>
        <div className='input'>
          <input
            id='submit-button'
            className='input'
            placeholder='Message text here'
            value={body}
            onChange={(e) => setContent({ ...content, body: e.target.value })}
          />
          <br />
        </div>
        <button className='post-button' onClick={createDirectMessages}>
          Send
        </button>
      </div>
    </div>
  );
}

export default FirstMessage;
