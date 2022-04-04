import React from "react";
import "./stepOne.scss";

const StepOne = () => {
  return (
    <div className="stepOne">
      <div className="header">
        <h1>Create or Join a Project!</h1>
      </div>
      <div className="create-container">
        <div className="start-text">
          <div className="start-header">
            <h3>Starting a new project is easy- </h3>
          </div>
          <div className="start-content">
            <h3>
              gitTogether's GitHub integration allows you to see a potential
              team member's top languages and their GitHub link within a few
              clicks!
            </h3>
          </div>
        </div>
        <div className="create-img">
          <img
            className="proj-form-img"
            src="assets/add-project-form.png"
            alt=""
          />
        </div>
      </div>
      <div className="join-container">
        <div className="join">
          <img className="join-img" src="assets/project_feed.png" alt="" />
        </div>
        <div className="join-text">
          <div className="join-header">
            <h3>Run out of ideas? </h3>
          </div>
          <div className="join-content">
            <h3>
              No worries! Our project feed will keep you up to date with
              projects posted from other developers who are currently looking
              for other collaborators. Joining a project is just a click away!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepOne;
