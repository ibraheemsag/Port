import React, { useState } from 'react';
import './ProjectTabs.css';

const ProjectTabs = ({ demoContent, technicalContent, gitRepo}) => {
    const [activeTab, setActiveTab] = useState('demo');

    const renderContent = () => {
        switch (activeTab) {
            case 'demo':
                return <div className="tab-content">{demoContent}</div>
            case 'technical':
                return <div className="tab-content">{technicalContent}</div>
            default:
                return null;
        }
    };
    return (
        <div className="project-tabs">
            <div className="tabs-header">
            <button onClick={() => setActiveTab('demo')} className={`tab-button ${activeTab === 'demo' ? 'active' : ''}`}>
                Demo
            </button>
            <button onClick={() => setActiveTab('technical')} className={`tab-button ${activeTab === 'technical' ? 'active' : ''}`}>
                Technical Details
            </button>
            <button onClick={() => window.open(gitRepo, '_blank')} className='tab-button'>
                Git Repository
            </button>
            </div>
            {renderContent()}
        </div>
    )
    
}
export default ProjectTabs;