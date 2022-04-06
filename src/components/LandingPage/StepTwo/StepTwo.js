import React from "react";
import "./stepTwo.scss";

const StepTwo = () => {
  return (
    <div className="stepTwo">
      <div className="team-header">
        <h1>Find Team Members!</h1>
      </div>
      <div className="team-container">
        <div className="landing-profile-text">
          <div className="landing-profile-header">
            <h3>GitHub Integration- </h3>
          </div>
          <div className="landing-profile-content">
            <h3>
              gitTogether's GitHub integration allows you to see a potential
              team member's top languages and their GitHub link in a user's profile.
            </h3>
          </div>
        </div>
        <div className="landing-profile-img">
          <img src="assets/user_profile.png" alt="" />
        </div>
      </div>
      <div className="landing-chat-container">
        <div className="landing-chat-text">
          <div className="landing-chat-header">
            <h3>Time to Chat! </h3>
          </div>
          <div className="landing-chat-content">
            <h3>
              Use gitTogether's chat feature to talk to your project team members.
              A direct message option also exists if you want to have private conversations.
            </h3>
          </div>
        </div>
        <div className="landing-chat-img">
          <img src="assets/chat.png" alt="" />
        </div>
      </div>
    </div>
  );
};

export default StepTwo;
