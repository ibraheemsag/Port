import React, {useState} from 'react';
import "./Arca.css";

const Arc = () => {
  const [activeTab, setActiveTab] = useState('technical');
  
  // Technical content component
  const technicalContent = (
    <div className="technical-content">
      <h2>Technical Details</h2>
      
      <section className="technical-section">
        <h3>Project Overview</h3>
        <p>
          I developed ARCA (Agentic Root Cause Analyzer) as part of a research team at KAUST, working under professorial guidance. 
          ARCA is an innovative system that leverages Large Language Models and the ReAct framework to automate root cause analysis of 
          service-level objective violations in microservice architectures. Through this academic research project, I demonstrated my ability to:
        </p>
        <ul>
          <li><strong>Design agent architectures</strong> that emulate the cognitive processes of expert engineers</li>
          <li><strong>Orchestrate complex microservice environments</strong> with controlled fault injection</li>
          <li><strong>Build evaluation frameworks</strong> to assess AI system performance in technical domains</li>
        </ul>
      </section>
      
      <section className="technical-section">
        <h3>Technical Implementation</h3>
        <p>
          The ARCA system combines several advanced components and technologies:
        </p>
        <ul>
          <li><strong>CodeReAct Agent:</strong> Implemented a novel LLM agent architecture using <strong>DSPy</strong> and <strong>Claude 3.5 Sonnet</strong> that enables non-linear investigation paths, dynamic code execution, and flexible state management</li>
          <li><strong>Workload Orchestration:</strong> Built an automated orchestration engine that interfaces with benchmark microservices through Docker and Blueprint</li>
          <li><strong>Chaos Engineering:</strong> Created a fault injection toolkit supporting memory stress, CPU contention, network degradation, and I/O contention</li>
          <li><strong>Observability Integration:</strong> Developed pipelines for collecting and analyzing metrics, logs, and distributed traces from Prometheus, Docker, and Jaeger</li>
          <li><strong>Advanced LLM Techniques:</strong> Leveraged DSPy for prompt optimization and Claude 3.5 for its superior reasoning capabilities in complex technical domains</li>
        </ul>
      </section>
      
      <section className="technical-section">
        <h3>Key Achievements</h3>
        <p>This project demonstrates my technical ability through several impressive outcomes:</p>
        <ul>
          <li><strong>MSACausalBench Performance:</strong> 
            <p>Our first benchmark, MSACausalBench, evaluates an agent's ability to perform causal reasoning and understand system dependencies in microservice architectures.</p>
            <ul>
              <li>Achieved <strong>93% accuracy</strong> in code-based system understanding tasks</li>
              <li>Perfect (100%) accuracy on service dependency mapping questions</li>
              <li>Strong performance (88%) on complex request flow analysis</li>
              <li>Successfully demonstrated that direct code access outperforms text-based descriptions for technical reasoning</li>
            </ul>
          </li>
          <li><strong>SLOvRCABench Performance:</strong>
            <p>Our second benchmark, SLOvRCABench, tests end-to-end root cause analysis on real-world failure scenarios in microservice environments.</p>
            <ul>
              <li>Successfully verified SLO violations with <strong>100% reliability</strong> across all test scenarios</li>
              <li>Achieved 80% success rate in properly completing complex investigations</li>
              <li>Correctly identified the failing service in 60% of memory stress and network degradation scenarios</li>
              <li>Accurately diagnosed the root cause in 40% of cases, showing strongest performance on memory-related failures</li>
            </ul>
          </li>
          <li><strong>Agent Architecture Innovation:</strong>
            <ul>
              <li>Implemented a flexible agent that can maintain multiple parallel investigation hypotheses</li>
              <li>Demonstrated robust error handling with successful recovery in 93% of execution failures</li>
              <li>Achieved reliable investigation completion despite the complexity of microservice failure analysis</li>
            </ul>
          </li>
        </ul>
      </section>
      
      <section className="technical-section">
        <h3>Skills Demonstrated</h3>
        <p>Through this project, I developed and applied the following skills relevant to AI and systems engineering roles:</p>
        <ul>
          <li><strong>AI System Design:</strong> LLM agent architectures, prompt engineering, context management</li>
          <li><strong>Distributed Systems:</strong> Microservice debugging, fault injection, observability data analysis</li>
          <li><strong>Software Engineering:</strong> Python development, containerization, dynamic code execution</li>
          <li><strong>Data Analysis:</strong> Time-series processing, log analysis, distributed trace interpretation</li>
          <li><strong>Problem Solving:</strong> Root cause analysis, causal reasoning, hypothesis formulation and testing</li>
        </ul>
      </section>
      
      <section className="technical-section">
        <h3>Research Context</h3>
        <p>
          This project was conducted as part of a formal research initiative at KAUST under the supervision of a professor. 
          As a member of the research team, I collaborated with fellow researchers including Omar Ayman Fayoumi to:
        </p>
        <ul>
          <li><strong>Advance the field</strong> of automated root cause analysis in microservice architectures</li>
          <li><strong>Publish findings</strong> in academic papers documenting our novel approaches</li>
          <li><strong>Create open-source tools</strong> for the broader research community</li>
          <li><strong>Develop standardized benchmarks</strong> to evaluate future work in this domain</li>
        </ul>
        <p>
          The work represents a significant contribution to the intersection of large language models and systems engineering,
          establishing new approaches for AI-assisted troubleshooting in complex distributed environments.
        </p>
      </section>
    </div>
  );

  // Paper content component
  const paperContent = (
    <div className="paper-content">
      <h2>Research Paper</h2>
      
      <section className="paper-section">
        <h3>ARCA: Agentic Root Cause Analysis for Microservice Architectures</h3>
        <p className="paper-authors">
          Omar Ayman Fayoumi, Ibraheem Alsaghier, et al.<br />
          Under the supervision of Professor Marco Canini<br />
          King Abdullah University of Science and Technology (KAUST)
        </p>
        
        <div className="paper-download">
          <a 
            href="/FinalAlsaghFayoumi.pdf" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="paper-download-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="download-icon">
              <path d="M.5 9.9a.5.5 0 0 1 .5.5v2.5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-2.5a.5.5 0 0 1 1 0v2.5a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2v-2.5a.5.5 0 0 1 .5-.5z"/>
              <path d="M7.646 11.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 10.293V1.5a.5.5 0 0 0-1 0v8.793L5.354 8.146a.5.5 0 1 0-.708.708l3 3z"/>
            </svg>
            Download Research Paper (PDF)
          </a>
        </div>
        
        <div className="paper-abstract">
          <h4>Abstract</h4>
          <p>
            Root cause analysis (RCA) of service-level objective (SLO) violations in microservice architectures presents significant challenges due to the complexity of distributed systems and the cognitive load placed on on-call engineers. This paper introduces ARCA (Agentic Root Cause Analyzer), a novel system that leverages large language models (LLMs) and the ReAct framework to automate and streamline the RCA process. We present CodeReAct, an innovative agent architecture that combines dynamic code execution capabilities with flexible state management to emulate the adaptive investigation patterns of experienced site reliability engineers. 
          </p>
          <p>
            To evaluate our approach, we introduce two comprehensive benchmarks: MSACausalBench for assessing causal reasoning capabilities in microservice environments, and SLOvRCABench for testing end-to-end root cause analysis performance. Our results demonstrate that CodeReAct achieves strong performance in system understanding tasks, with up to 93% accuracy in code-based analysis, while showing promising results in identifying root causes across various failure scenarios. 
          </p>
          <p>
            We also provide an open workload orchestration and fault injection library built on Blueprint and Docker to facilitate further research in this domain. Our work highlights both the potential and current limitations of LLM-based agents in automated root cause analysis, while establishing new benchmarks for evaluating such systems.
          </p>
        </div>
      </section>
      
      <section className="paper-section">
        <h3>Key Contributions</h3>
        <ul>
          <li>A novel CodeReAct agent architecture that combines reasoning about code, metrics, logs, and traces</li>
          <li>Two new benchmarks for evaluating root cause analysis in microservice architectures</li>
          <li>Empirical evidence showing the effectiveness of code-aware agents for systems troubleshooting</li>
          <li>A comprehensive evaluation framework for microservice failure scenarios</li>
        </ul>
      </section>
      
    </div>
  );
  
  // Render the appropriate content based on active tab
  const renderContent = () => {
    switch (activeTab) {
      case 'technical':
        return technicalContent;
      case 'paper':
        return paperContent;
      default:
        return technicalContent;
    }
  };

  return (
    <div className="mhqc-container">
      <h1>ARCA - Agentic Root Cause Analyzer</h1>
      
      <div className="arc-tabs-container">
        <div className="arc-tabs-header">
          <button 
            onClick={() => setActiveTab('technical')} 
            className={`arc-tab-button ${activeTab === 'technical' ? 'active' : ''}`}
            aria-pressed={activeTab === 'technical'}
          >
            Technical Details
          </button>
          <button 
            onClick={() => setActiveTab('paper')} 
            className={`arc-tab-button ${activeTab === 'paper' ? 'active' : ''}`}
            aria-pressed={activeTab === 'paper'}
          >
            Research Paper
          </button>
        </div>
        
        <div className="arc-tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}

export default Arc; 