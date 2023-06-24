import React from "react";

const Footer = () => {
  return (
    <footer className="footer conatainer">
      <div className="footer-content">
        <p>
          &copy; {new Date().getFullYear()} PinterestClone by Team Limit Test.
          All rights reserved.
        </p>
        <div>
          <p>
            <a href="/about">About</a> <a href="/help">Help</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
