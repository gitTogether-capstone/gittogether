import React from 'react';
import AddProject from './AddProject';
import './Popup.css';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      {props.children}
      <AddProject closePopup={props.setTrigger} />
    </div>
  ) : (
    ''
  );
}

export default Popup;
