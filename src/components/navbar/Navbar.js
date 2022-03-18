import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <div id="navBar">
      <div id="leftNav">
        <span>gitTogether</span>
        <div>
          <span>Browse Ideas</span>
        </div>
        <div>
          <span>Messages</span>
        </div>
      </div>
      <div id="rightNav">
        <div className="iconContainer">
          <span></span>
        </div>
        <div className="loginButton">Login</div>
      </div>
    </div>
  );
}
