import React from "react";
import footerStyle from "../Style/footer.css";

function Footer() {
  return (
    <footer style={footerStyle} className="footer">
      <ul className="nav justify-content-center border-bottom pb-3 mb-3">
        <li className="nav-item"><a href="/about" className="nav-link px-2 text-body-secondary">About</a></li>
        <li className="nav-item"><a href="/help" className="nav-link px-2 text-body-secondary">Help</a></li>
      </ul>
      <p className="text-center text-body-secondary">&copy; {new Date().getFullYear()} PinterestClone by Team Limit Test.
        All rights reserved.</p>
    </footer>
  )
}

export default Footer;
