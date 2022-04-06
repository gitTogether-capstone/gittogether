import React from "react";
import "./stepThree.scss";

const StepThree = () => {
  return (
    <div className="stepThree">
      <div className="stepThree-header">
        <h1>Finalize and Create a Repo!</h1>
      </div>
      <div className="single-project-container">
        <div className="single-project-text">
          <div className="single-project-header">
            <h3>All set? Repo Time!</h3>
            </div>
          <div className="single-project-content">
            <h3>Simply go to a project page to be able to automatically create its GitHub repo. Does the project already have a repo? No problem! Just add the repo's GitHub link.   </h3>
            </div>
        </div>
        <div className="single-project-img">
          <img
            src="assets/single_project.png"
            alt=""
            />
          </div>
      </div>

      <div className="repo-form-container"></div>
    </div>
  );
};

export default StepThree;
