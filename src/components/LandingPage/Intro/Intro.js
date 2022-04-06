import React from "react";
import { Link } from "react-router-dom";
import "./intro.scss";

const Intro = () => {
  return (
    <div className="intro">
      <div className="intro-text">
        <div className="intro-header">
          <h1>Where the world gits together</h1>
        </div>
        <div className="intro-description">
          <h2>
            Millions of developers are collaborating together on gitTogether-the
            largest and most advanced software development social platform in
            the world.
          </h2>
        </div>
        <div className="intro-signup-button">
        <Link to='/login'>
          <button>Sign up for gitTogether</button>
          </Link>
        </div>
      </div>

      <div className="world-container">
        <img className="world-img" src="assets/gitHub_world.png" alt="" />
        <img
          className="astro-img"
          src="assets/cute-astronaut-floating-space-no-stars.png"
          alt=""
        />
      </div>
    </div>
  );
};

export default Intro;
