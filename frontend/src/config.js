// Application configuration
const config = {
  // API settings
  api: {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://port-backend-4.centralindia.azurecontainer.io',
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