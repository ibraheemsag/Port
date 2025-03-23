// Application configuration
const config = {
  // API settings
  api: {
    // Using new Azure App Service with built-in HTTPS
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'https://port-backend-service.azurewebsites.net',
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