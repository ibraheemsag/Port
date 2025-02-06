import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to My Portfolio</h1>
      <section className="intro-section">
        <h2>Computer Science Student & Developer</h2>
        <p>
          Hello! I'm a passionate Computer Science student looking to make my mark
          in the world of technology. Through this portfolio, I showcase my
          journey, projects, and technical skills.
        </p>
      </section>
      <section className="highlights">
        <h3>What I Do</h3>
        <ul>
          <li>Software Development</li>
          <li>Web Development</li>
          <li>Problem Solving</li>
          <li>Continuous Learning</li>
        </ul>
      </section>
    </div>
  );
};

export default Home;