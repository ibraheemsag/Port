import React, { useState } from 'react';
import "./ImageBar.css";
import config from '../../config';

const ImageBar = ({ onImageUpload }) => {
    
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const handleImageUpload = async (event) => {
        const selectedFile = event.target.files[0];
        
        if (selectedFile) {
            // Set loading state
            setIsLoading(true);
            
            try {
                // Check file size using config
                const maxSize = config.image.maxSizeMB * 1024 * 1024;
                if (selectedFile.size > maxSize) {
                    setError(`File size must be less than ${config.image.maxSizeMB}MB`);
                    setFile(null);
                    setPreviewUrl(null);
                    return;
                }
                
                // Check file type using config
                if (!config.image.supportedTypes.includes(selectedFile.type)) {
                    setError(`Only ${config.image.supportedTypes.map(t => t.split('/')[1].toUpperCase()).join(' and ')} images are supported`);
                    setFile(null);
                    setPreviewUrl(null);
                    return;
                }
                
                // Clear any previous errors
                setError(null);
                
                // Simulate processing delay for large files (optional)
                if (selectedFile.size > 1 * 1024 * 1024) {
                    await new Promise(resolve => setTimeout(resolve, 500));
                }
                
                // Store the file object
                setFile(selectedFile);
                
                // Create and set URL for preview
                const objectUrl = URL.createObjectURL(selectedFile);
                setPreviewUrl(objectUrl);
                
                // Pass the file back to the parent component
                if (onImageUpload) {
                    onImageUpload(selectedFile);
                }
            } catch (err) {
                setError("Error processing image: " + err.message);
            } finally {
                // Clear loading state
                setIsLoading(false);
            }
        }
    };
    
    return (
        <div className="image-bar">
            <h1>Image Bar</h1>
            
            <div className="upload-button-container">
                <label className={`upload-button ${isLoading ? 'disabled' : ''}`}>
                    {isLoading ? 'Processing...' : 'Select Image'}
                    <input 
                        type="file" 
                        accept={config.image.supportedTypes.join(',')} 
                        onChange={handleImageUpload} 
                        disabled={isLoading}
                        style={{ display: 'none' }}
                    />
                </label>
            </div>
            
            {error && <p className="error">{error}</p>}
            
            <div className="image-preview">
                {isLoading ? (
                    <div className="loading-indicator">
                        <div className="spinner"></div>
                        <p>Processing image...</p>
                    </div>
                ) : previewUrl ? (
                    <img src={previewUrl} alt="Uploaded preview" />
                ) : (
                    <div className="no-image-placeholder">
                        <p>No image selected</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ImageBar;