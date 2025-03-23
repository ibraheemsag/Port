import React from 'react';
import './EmotionSelector.css';
import config from '../../config';

const EmotionSelector = ({ selectedEmotion, onEmotionSelect }) => {
  // Use emotions from config instead of hardcoding
  const emotions = config.emotions;

  return (
    <div className="emotion-selector">
      <h2>Select an Emotion</h2>
      <div className="emotion-buttons">
        {emotions.map((emotion) => (
          <button
            key={emotion.name}
            className={`emotion-button ${selectedEmotion === emotion.name ? 'selected' : ''}`}
            onClick={() => onEmotionSelect(emotion.name)}
          >
            <span className="emotion-emoji">{emotion.emoji}</span>
            <span className="emotion-name">{emotion.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmotionSelector;