import Image from "next/image";
import React from "react";
import { footers } from "../../../constant";
import "./footer.css"

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-header">
      <div className="footer-header-logo">
      <Image src="/logo.png" alt="logo" width={80} height={80} />
        <h2>Ryan Estate</h2>
      </div>
        <p>© 2025 Ryan Estate. All rights reserved.</p>
      </div>
  <div className="footer-container">
    {footers.map((footer) => (
      <div key={footer.title} className="footer-section">
        <h3 className="footer-title">{footer.title}</h3>
        <ul className="footer-links">
          {footer.links.map((link) => (
            <li key={link.name} className="footer-link-item">
              <a href={link.url} className="footer-link">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
      )
    )}
  </div>
  </div>
  );
};

export default Footer;
