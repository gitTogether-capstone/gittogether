import React from "react";
import "./footer.scss";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CopyrightIcon from "@mui/icons-material/Copyright";

const Footer = () => {
  return (
    <div className="footer-container">
      <div className="footer">
        <div className="footer-heading footer-1">
          <h4>Why gitTogether?</h4>
          <ul>
            <li>Our Mission</li>
            <li>Engagement</li>
            <li>Scale</li>
            <li>Watch Demo</li>
          </ul>
        </div>
        <div className="footer-heading footer-2">
          <h4>Product</h4>
          <ul>
            <li>Features</li>
            <li>Integrations</li>
            <li>Enteprise</li>
            <li>Solutions</li>
          </ul>
        </div>
        <div className="footer-heading footer-3">
          <h4>Company</h4>
          <ul>
            <li>About Us</li>
            <li>Our Services</li>
            <li>Privacy Policy</li>
            <li>Affiliate Program</li>
          </ul>
        </div>
        <div className="footer-heading footer-4">
          <h4>Follow Us</h4>
          <div className="socials">
            <TwitterIcon />
            <YouTubeIcon />
            <FacebookIcon />
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div className="legal">
        <span>
          <CopyrightIcon className="copyright" />
          gitTogether
        </span>
        <span>Legal</span>
        <span>Privacy Center</span>
        <span>Privacy Policy</span>
        <span>Cookies</span>
        <span>About Ads</span>
        <span>Additional Privacy Disclosures</span>
      </div>
    </div>
  );
};

export default Footer;
