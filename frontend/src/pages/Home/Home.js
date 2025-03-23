import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Ibraheem Alsaghier</h1>
      <div className="profile-image-container">
        <img 
          src="/Ibraheem Alsaghier.jpg" 
          alt="Ibraheem Alsaghier" 
          className="profile-image"
          loading="lazy"
          decoding="async"
          sizes="(max-width: 768px) 220px, 300px"
          fetchpriority="high"
        />
      </div>
      <section className="intro-section">
      <h2>AI Systems & Computer Science Researcher</h2>
        <p>
          I'm a Computer Science graduate student at KAUST specializing in AI and distributed systems. 
          With research experience in agentic AI fault-diagnosis for microservices, I build intelligent 
          systems that solve complex problems. My expertise spans deep learning, recommendation systems, 
          and emotion-based image processing, backed by a strong foundation from UNC Chapel Hill.
        </p>
    </section>
      
      <section className="skills-section">
        <h2>Technical Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Programming Languages</h3>
            <ul>
              <li>Python</li>
              <li>Java</li>
              <li>C</li>
              <li>Go</li>
              <li>SQL</li>

            </ul>
          </div>
          
          <div className="skill-category">
            <h3>Python Modules</h3>
            <ul>
              <li>PyTorch</li>
              <li>Pandas</li>
              <li>NumPy</li>
              <li>SciPy</li>
              <li>Hugging Face Transformers</li>
            </ul>
          </div>
        </div>
        <div className="skill-category">
          <h3>Web & Backend Technologies</h3>
          <ul>
            <li>React</li>
            <li>FastAPI</li>
            <li>Docker</li>
            <li>Azure</li>
          </ul>
      </div>
      </section>

      
      <section className="contact-section">
        <h2>Contact Information</h2>
        <div className="contact-grid">
          <div className="contact-item">
            <h3>Get in Touch</h3>
            <p>I'm always open to new opportunities and connections!</p>
            <p>Email: ibraheemsag@gmail.com</p>
            <p>Phone: +966 560010643</p>
            <p>Location: Thuwal, Saudi Arabia</p>
          </div>
          
          <div className="contact-item">
            <h3>Professional Profiles</h3>
            <ul>
              <li><a href="https://github.com/ibraheemalsaghier" target="_blank" rel="noopener noreferrer">GitHub</a></li>
              <li><a href="https://www.linkedin.com/in/ibraheem-m-alsaghier-964744298/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
          
          <div className="contact-item">
            <h3>Resume</h3>
            <p>Download my latest resume</p>
            <a href="/AlsaghierRes.pdf" download className="resume-button">Download Resume</a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;