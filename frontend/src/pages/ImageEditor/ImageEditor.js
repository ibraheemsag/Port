import React, { useState } from 'react';
import "./ImageEditor.css";
import EmotionSelector from '../../components/EmotionSelector/EmotionSelector';
import imageService from '../../services/imageService';

const ImageEditor = () => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const [modifiedImage, setModifiedImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null);
  const [error, setError] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('demo');
  
  // GitHub repository URL - you can replace this with the actual repo
  const gitRepoUrl = "https://github.com/ibraheemsag/Port";

  // Function to handle emotion selection
  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    console.log("Selected emotion:", emotion);
  };

  // Function to handle image upload from ImageBar
  const handleImageUpload = (image) => {
    setIsUploading(true);
    // Simulate a slight delay to show loading state (optional)
    setTimeout(() => {
      setUploadedImage(image);
      setIsUploading(false);
    }, 300);
  };

  // Function to send image and emotion to backend
  const handleModifyImage = async () => {
    if (!uploadedImage || !selectedEmotion) {
      alert("Please upload an image and select an emotion first");
      return;
    }

    setIsLoading(true);
    setError(null); // Clear any previous errors

    try {
      // Use the image service to modify the image
      const data = await imageService.modifyImage(uploadedImage, selectedEmotion);
      setModifiedImage(data.image_url);
    } catch (error) {
      console.error('Error modifying image:', error);
      setError(error.message);
      if (error.message.includes('Rate limit')) {
        console.log('Rate limited!');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Demo content: your image editor UI wrapped as the demo tab
  const demoContent = (
    <div className="demo-content">
      <p>
        This is a tool that allows you to generate images that are designed to evoke a specific emotion.
      </p>
      <p>
        To get started, please upload an image and select the emotion you want to evoke.
      </p>

      <div className="images-container">
        <div className="upload-section">
          <h3 className="image-container-title">Original Image</h3>
          <div className="image-preview-wrapper">
            <div className="image-preview">
              {isUploading ? (
                <div className="loading-indicator">
                  <div className="spinner"></div>
                  <p>Processing image...</p>
                </div>
              ) : uploadedImage ? (
                <img src={URL.createObjectURL(uploadedImage)} alt="Original" />
              ) : (
                <div className="no-image-placeholder">
                  <p>No image selected</p>
                </div>
              )}
            </div>
          </div>

          <div className="upload-button-container">
            <label className={`upload-button ${isUploading ? 'disabled' : ''}`}>
              {isUploading ? 'Processing...' : 'Select Image'}
              <input 
                type="file" 
                accept="image/jpeg,image/png,image/gif" 
                onChange={(e) => handleImageUpload(e.target.files[0])} 
                disabled={isUploading}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        <div className="upload-section">
          <h3 className="image-container-title">Modified Image</h3>
          <div className="image-preview-wrapper">
            <div className="modified-image-container">
              {modifiedImage ? (
                <img 
                  src={modifiedImage} 
                  alt={`Modified to evoke ${selectedEmotion}`} 
                  className="modified-image"
                />
              ) : isLoading ? (
                <div className="modified-image-placeholder loading">
                  <div className="spinner"></div>
                  <p>Generating emotional image...</p>
                </div>
              ) : (
                <div className="modified-image-placeholder">
                  <p>Modified image will appear here</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <EmotionSelector 
        selectedEmotion={selectedEmotion} 
        onEmotionSelect={handleEmotionSelect} 
      />
      {selectedEmotion && (
        <div className="selected-emotion">
          <p>You selected: {selectedEmotion}</p>
        </div>
      )}

      <div className="modify-button-container">
        <button 
          className="modify-button"
          onClick={handleModifyImage}
          disabled={!uploadedImage || !selectedEmotion || isLoading || isUploading}
        >
          {isLoading ? (
            <>
              <span className="button-spinner"></span>
              Processing...
            </>
          ) : 'Modify Image'}
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}
    </div>
  );

  // Technical details content placeholder
  const technicalDetailsContent = (
    <div className="technical-details-content">
      <h2>Technical Details</h2>
      
      <section className="technical-section">
        <h3>Project Overview</h3>
        <p>
          I developed an Affective Image Generator, a FastAPI-based backend service that transforms uploaded images to evoke 
          specific emotions using AI. This project demonstrates my ability to:
        </p>
        <ul>
          <li><strong>Design and implement AI pipelines</strong> leveraging multiple models in sequence</li>
          <li><strong>Build production-ready APIs</strong> with validation, caching, and rate limiting</li>
          <li><strong>Integrate advanced AI models</strong> (Claude and DALL-E) for complex transformations</li>
          <li><strong>Optimize system performance</strong> for balance between cost and responsiveness</li>
        </ul>
      </section>

      <section className="technical-section">
        <h3>Technical Implementation</h3>
        <p>
          The system's modular API architecture implements a sophisticated image processing pipeline:
        </p>
        <ul>
          <li><strong>AI Orchestration:</strong> Designed a multi-stage pipeline linking Claude's vision capabilities with DALL-E's image generation</li>
          <li><strong>Performance Optimization:</strong> Implemented caching systems, rate limiting, and async processing for optimal throughput</li>
          <li><strong>Prompt Engineering:</strong> Created carefully crafted prompts to guide AI models through emotional transformations</li>
          <li><strong>Validation Pipeline:</strong> Built comprehensive input validation for image dimensions, file size, and format before costly API calls</li>
        </ul>
      </section>

      <section className="technical-section">
        <h3>Key Achievements</h3>
        <p>This project demonstrates my technical ability through several impressive outcomes:</p>
        <ul>
          <li>Successfully transformed images while <strong>preserving original scene context</strong> but evoking new emotions</li>
          <li>Implemented a <strong>production-ready API</strong> with comprehensive error handling and logging</li>
          <li>Created a system that effectively bridges <strong>computer vision and natural language understanding</strong></li>
          <li>Balanced technical complexity with <strong>user experience requirements</strong> and operational constraints</li>
        </ul>
      </section>

      <section className="technical-section">
        <h3>Skills Demonstrated</h3>
        <p>Through this project, I developed and applied the following skills relevant to software engineering and AI roles:</p>
        <ul>
          <li><strong>API Development:</strong> Designed and implemented a RESTful API using FastAPI and modern Python practices</li>
          <li><strong>AI Integration:</strong> Successfully orchestrated multiple AI models in a processing pipeline</li>
          <li><strong>System Design:</strong> Implemented caching, rate limiting, and validation subsystems</li>
          <li><strong>Error Handling & Logging:</strong> Developed comprehensive error handling with detailed logging</li>
          <li><strong>Performance Optimization:</strong> Applied techniques to improve throughput and reduce operational costs</li>
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
        return technicalDetailsContent;
      default:
        return demoContent;
    }
  };

  return (
    <div className="image-editor">
      <h1>Welcome to the Affective Image Generator</h1>
      
      <div className="image-editor-tabs-container">
        <div className="image-editor-tabs-header">
          <button 
            onClick={() => setActiveTab('demo')} 
            className={`image-editor-tab-button ${activeTab === 'demo' ? 'active' : ''}`}
            aria-pressed={activeTab === 'demo'}
          >
            Demo
          </button>
          <button 
            onClick={() => setActiveTab('technical')} 
            className={`image-editor-tab-button ${activeTab === 'technical' ? 'active' : ''}`}
            aria-pressed={activeTab === 'technical'}
          >
            Technical Details
          </button>
          <button 
            onClick={() => window.open(gitRepoUrl, '_blank', 'noopener,noreferrer')} 
            className="image-editor-tab-button"
            aria-label="Open GitHub Repository in a new tab"
          >
            GitHub Repository
          </button>
        </div>
        
        <div className="image-editor-tab-content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ImageEditor;
