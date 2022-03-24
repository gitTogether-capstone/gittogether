import React from "react";
import AddProject from "./AddProject";
import "./Popup.css";

function Popup(props) {
  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        <button
          classNmae='close-button'
          onClick={() => props.setTrigger(false)}
        >
          X
        </button>
        {props.children}
        <AddProject component={AddProject} />
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
