import React, { useState } from 'react';
import './ToggleTheme.css';

const ToggleTheme = () => {
  const [isDark, setIsDark] = useState(false);

  const toggleTheme = () => {
    setIsDark(!isDark);
    // Update the data-theme attribute on the document body
    document.body.setAttribute('data-theme', isDark ? 'light' : 'dark');
  };

  return (
    <button 
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
    >
      {isDark ? '🌞' : '🌙'}
    </button>
  );
};

export default ToggleTheme;