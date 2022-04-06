import React from "react";
import AdminAddLanguages from "./AdminAddLanguage";
import "./AdminPopup.css";

function AdminPopup(props) {
  return props.trigger ? (
    <div className='popup'>
      <div className='popup-inner'>
        {props.children}
        <AdminAddLanguages />
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

export default AdminPopup;
