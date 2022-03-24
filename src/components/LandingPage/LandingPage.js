import React from "react";
import  "./landingPage.scss";
import Intro from "./Intro/Intro";
import StepOne from "./StepOne/StepOne";
import StepTwo from "./StepTwo/StepTwo";
import StepThree from "./StepThree/StepThree";
import Final from "./Final/Final";

const LandingPage = () => {
  return (
    <div className="landing-container">
    <div className="sections">
      <Intro />
      <StepOne />
      <StepTwo />
      <StepThree />
      <Final />
    </div>
    </div>
  );
};

export default LandingPage;
