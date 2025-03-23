// Application configuration
const config = {
  // API settings
  api: {
    // Use a reliable CORS proxy to guarantee the request works
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://cors-anywhere.herokuapp.com/http://20.207.90.219',
  },
  
  // Image settings
  image: {
    maxSizeMB: 5,
    supportedTypes: ['image/jpeg', 'image/png'],
    maxWidth: 8000,
    maxHeight: 8000,
  },
  
  // Emotion options
  emotions: [
    { name: 'Disgust', emoji: '🤢' },
    { name: 'Sadness', emoji: '😢' },
    { name: 'Anger', emoji: '😡' },
    { name: 'Joy', emoji: '😄' },
    { name: 'Fear', emoji: '😨' },
  ]
};

export default config; 