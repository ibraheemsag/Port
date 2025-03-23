// A simple service for image-related API calls
import config from '../config';

const imageService = {
  /**
   * Modify an image to evoke a specific emotion
   * @param {File} image - The image file to modify
   * @param {string} emotion - The emotion to evoke
   * @returns {Promise<Object>} - The response data with image_url
   * @throws {Error} - With appropriate message for different error types
   */
  async modifyImage(image, emotion) {
    try {
      const formData = new FormData();
      formData.append('image', image);
      formData.append('emotion', emotion);
      
      console.log(`DEBUG: Sending request to ${config.api.baseUrl}/pix`);
      console.log(`DEBUG: Image file: ${image.name}, size: ${image.size}, type: ${image.type}`);
      console.log(`DEBUG: Selected emotion: ${emotion}`);
      
      const response = await fetch(`${config.api.baseUrl}/pix`, {
        method: 'POST',
        body: formData,
        mode: 'cors',
        headers: {
          'Accept': 'application/json',
        },
        credentials: 'omit'
      });
      
      // Handle rate limiting (429 Too Many Requests)
      if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again in a minute.');
      }
      
      // Handle other error responses
      if (!response.ok) {
        console.error(`Server error: ${response.status} ${response.statusText}`);
        const errorText = await response.text();
        console.error(`Response body: ${errorText}`);
        
        let errorMessage;
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.detail || `Error: ${response.status} ${response.statusText}`;
        } catch (e) {
          errorMessage = `Error: ${response.status} ${response.statusText} - ${errorText.substring(0, 100)}`;
        }
        
        throw new Error(errorMessage);
      }
      
      // Parse successful response
      return await response.json();
    } catch (error) {
      // Log the error for debugging
      console.error('Image service error:', error);
      
      // Network errors (like CORS or connection issues)
      if (error.name === 'TypeError' && error.message.includes('Failed to fetch')) {
        console.error('Network error - likely CORS or connectivity issue');
        throw new Error('Network error: Unable to connect to the server. This might be due to CORS restrictions or network connectivity issues.');
      }
      
      // Re-throw the error with a user-friendly message
      if (error.message.includes('Rate limit')) {
        throw error; // Already has a good message
      } else {
        throw new Error(error.message || 'Failed to modify image. Please try again.');
      }
    }
  }
};

export default imageService;