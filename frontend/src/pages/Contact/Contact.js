import React from 'react';
import './Contact.css';
const Contact = () => {
  return (
    <div className="contact-container">
      <h1>Contact Me</h1>
      <p>I'm always open to new opportunities and connections!</p>
      
      <div className="contact-info">
        <div className="contact-method">
          <h3>Contact Information</h3>
          <p>ibraheemsag@gmail.com</p>
          <p>+966 560010643</p>
        </div>
        
        <div className="contact-method">
          <h3>Professional Profiles</h3>
          <ul>
            <li><a href="https://github.com/ibraheemsag">Github</a></li>
            <li><a href="https://www.linkedin.com/in/ibraheem-m-alsaghier-964744298/">LinkedIn</a></li>
          </ul>
        </div>

        <div className="contact-method">
          <h3>Location</h3>
          <p>Thuwal, Saudi Arabia</p>
        </div>
        <div className="contact-method">
          <h3>Resume</h3>
          <p> Download my latest resume</p>
          <a href="/AlsaghierRes.pdf" download>Resume</a>
        </div>
      </div>
    </div>
  );
};

export default Contact;