import React from "react";
import { Github, Linkedin, Instagram, ArrowRight, ExternalLink } from "lucide-react";
import "./contact-card.css";

export function ContactCard() {
  return (
    <div className="contact-parent">
      <div className="contact-card">
        <div className="logo-container">
          <span className="circle circle1"></span>
          <span className="circle circle2"></span>
          <span className="circle circle3"></span>
          <span className="circle circle4"></span>
          <div className="circle circle5">
            <img src="/logo.png" alt="Logo" className="w-full h-full object-cover rounded-full p-[2px]" />
          </div>
        </div>

        <div className="glass-layer"></div>

        <div className="content-container">
          <span className="card-title">Let's Connect</span>
          <span className="card-text">I'm always open to discussing product design work or partnership opportunities.</span>
        </div>

        <div className="bottom-container">
          <div className="social-buttons">
            <a href="https://github.com/bas1c-cmd" target="_blank" rel="noreferrer" className="social-button">
              <Github className="social-svg" />
            </a>
            <a href="https://www.linkedin.com/in/yassine-chaibi-271b02395/" target="_blank" rel="noreferrer" className="social-button">
              <Linkedin className="social-svg" />
            </a>
            <a href="https://www.instagram.com/bas1c.web/?utm_source=ig_web_button_share_sheet" target="_blank" rel="noreferrer" className="social-button">
              <Instagram className="social-svg" />
            </a>
          </div>

          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="view-more">
            <span className="view-more-button">Resume</span>
            <ExternalLink className="view-more-svg" />
          </a>
        </div>
      </div>
    </div>
  );
}
