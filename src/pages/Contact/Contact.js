import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <p>I'm always open to new opportunities and connections!</p>
      
      <div className="contact-info">
        <div className="contact-method">
          <h3>Email</h3>
          <p>your.email@example.com</p>
        </div>
        
        <div className="contact-method">
          <h3>Professional Profiles</h3>
          <ul>
            <li>GitHub: github.com/yourusername</li>
            <li>LinkedIn: linkedin.com/in/yourusername</li>
          </ul>
        </div>

        <div className="contact-method">
          <h3>Location</h3>
          <p>Your City, State</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;