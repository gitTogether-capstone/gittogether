import React from "react";
import Footer from "../../Footer/Footer";
import { Link } from "react-router-dom";
import "./final.scss";

const Final = () => {
  return (
    <div className="final">
      <div className="content">
        <div className="content-text">
          <div className="content-header">
            <h1>Make your contribution</h1>
            <div className="content-description">
              <h2>
                The next developer of your dreams starts with you! Join millions
                of other developers and sign up for gitTogether today!{" "}
              </h2>
            </div>
          </div>
          <div className="final-signup">
          <Link to='/login'>
          <button>Sign up for gitTogether</button>
          </Link>
          </div>
        </div>
        <div className="astro-final-img">
          <img
            src="assets/Cute-astronaut-floating-with-balloon-cartoon-on-transparent-background-PNG.png"
            alt=""
          />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Final;
