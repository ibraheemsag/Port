import './Projects.css';
/// Pick an LLM model
/// Pick a diffusion model. Maybe multiple and do sentiment analysis on them
/// See if you can run an LLM locally. Llama? Quen? or DeepSeek?
const Projects = () => {
  return (
    <div className="projects-container">
      <h1>My Projects</h1>
      <div className="projects-grid">
        <div className="project-card">
          <h3>Project 1 - Coming Soon</h3>
          <p>Currently under development. Check back soon!</p>
          <span className="status">Status: In Progress</span>
        </div>
        <div className="project-card">
          <h3>Project 2 - TBA</h3>
          <p>Future project placeholder. Details will be updated shortly.</p>
          <span className="status">Status: Planning</span>
        </div>
        <div className="project-card">
          <h3>Project 3 - Under Construction</h3>
          <p>Exciting new project in the works. Stay tuned!</p>
          <span className="status">Status: Planning</span>
        </div>
      </div>
    </div>
  );
};

export default Projects;