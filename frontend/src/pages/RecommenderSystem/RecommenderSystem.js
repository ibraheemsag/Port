import React, {useState} from 'react';
import './RecommenderSystem.css';

const RecommenderSystem = () => {
  const [activeTab, setActiveTab] = useState('demo');
  
  // GitHub repository URL
  const gitRepoUrl = "https://github.com/ibraheemsag/RecSystem/tree/main";
  
  // Demo content
  const demoContent = (
    <div className="demo-content">
      <div className="coming-soon-container">
        <h2>Demo Coming Soon</h2>
        <p>An interactive demonstration of this recommendation system is currently in development.</p>
      </div>
    </div>
  );

  // Technical details content
  const technicalContent = (
    <div className="technical-details-content">
      <h2>Technical Details</h2>
      
      <section className="technical-section">
        <h3>Project Overview</h3>
        <p>
          I developed a deep learning-based movie recommendation system that analyzes user-movie interactions 
          and movie metadata to predict personalized ratings. This project demonstrates my ability to:
        </p>
        <ul>
          <li><strong>Implement ML models</strong> using a hybrid DeepFM (Deep Factorization Machine) architecture</li>
          <li><strong>Process large datasets</strong> (32 million entries) efficiently</li>
          <li><strong>Perform complex feature engineering</strong> to improve model performance</li>
          <li><strong>Optimize deep learning pipelines</strong> using PyTorch</li>
        </ul>
      </section>

      <section className="technical-section">
        <h3>Technical Implementation</h3>
        <p>
          The recommendation engine combines multiple advanced techniques:
        </p>
        <ul>
          <li><strong>Data Integration:</strong> Merged and cleaned MovieLens and IMDB datasets to create a comprehensive movie information database</li>
          <li><strong>Feature Engineering:</strong> Created user statistics features, movie metadata features, and interaction features</li>
          <li><strong>Neural Architecture:</strong> Built a hybrid model with linear components, factorization machines, and deep neural networks</li>
          <li><strong>Optimization:</strong> Implemented memory-efficient loading, mixed precision training, and gradient scaling</li>
        </ul>
      </section>

      <section className="technical-section">
        <h3>Key Achievements</h3>
        <p>This project demonstrates my technical ability through several impressive outcomes:</p>
        <ul>
          <li>Achieved <strong>RMSE of 0.73</strong> and <strong>MAE of 0.55</strong> on the test dataset</li>
          <li><strong>83% of predictions</strong> fell within 1.0 stars of actual ratings</li>
          <li>Successfully processed and engineered features from <strong>32 million data entries</strong></li>
          <li>Implemented techniques to address the cold-start problem in recommendation systems</li>
          <li>Balanced model complexity with computational efficiency for practical deployment</li>
        </ul>
      </section>

      <section className="technical-section">
        <h3>Skills Demonstrated</h3>
        <p>Through this project, I developed and applied the following skills relevant to software engineering and ML roles:</p>
        <ul>
          <li><strong>Deep Learning:</strong> Architecture design, embedding techniques, neural networks</li>
          <li><strong>Software Engineering:</strong> Large-scale data processing, efficient algorithms, optimization</li>
          <li><strong>Data Science:</strong> Feature engineering, data cleaning, statistical analysis</li>
          <li><strong>Tools & Technologies:</strong> Python, PyTorch, data processing libraries</li>
          <li><strong>Problem Solving:</strong> Addressing sparsity, cold-start problems, and computational constraints</li>
        </ul>
      </section>
    </div>
  );

  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'demo':
        return demoContent;
      case 'technical':
        return technicalContent;
      default:
        return demoContent;
    }
  };

  return (
    <div className="recommender-system">
      <h1>Personalized Recommendation Engine</h1>
      
      <div className="recommender-tabs-container">
        <div className="recommender-tabs-header">
          <button 
            onClick={() => setActiveTab('demo')} 
            className={`recommender-tab-button ${activeTab === 'demo' ? 'active' : ''}`}
            aria-pressed={activeTab === 'demo'}
          >
            Demo
          </button>
          <button 
            onClick={() => setActiveTab('technical')} 
            className={`recommender-tab-button ${activeTab === 'technical' ? 'active' : ''}`}
            aria-pressed={activeTab === 'technical'}
          >
            Technical Details
          </button>
          <button 
            onClick={() => window.open(gitRepoUrl, '_blank', 'noopener,noreferrer')} 
            className="recommender-tab-button"
            aria-label="Open GitHub Repository in a new tab"
          >
            GitHub Repository
          </button>
        </div>
        
        <div className="recommender-tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default RecommenderSystem; 