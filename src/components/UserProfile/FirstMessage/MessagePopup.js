import React from "react";
import UserProfile from "../UserProfile";
import FirstMessage from "./FirstMessage";

function MessagePopup(props) {
  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <FirstMessage userId={props.userId} />
        <button
          className='close-button'
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
      </div>
    </div>
  ) : (
    ""
  );
}

export default MessagePopup;
