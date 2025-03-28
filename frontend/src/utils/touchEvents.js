/**
 * Touch event utilities for better mobile interaction
 */

// Detect if device supports touch events
export const isTouchDevice = () => {
  return (('ontouchstart' in window) ||
     (navigator.maxTouchPoints > 0) ||
     (navigator.msMaxTouchPoints > 0));
};

// Utility to handle both click and touch events
export const addClickOrTouchHandler = (element, handler) => {
  if (!element) return;
  
  element.addEventListener('click', handler);
  
  if (isTouchDevice()) {
    // Prevent double-firing on touch devices by using touchend
    element.addEventListener('touchend', (e) => {
      e.preventDefault();
      handler(e);
    });
  }
};

// Remove the event listeners
export const removeClickOrTouchHandler = (element, handler) => {
  if (!element) return;
  
  element.removeEventListener('click', handler);
  
  if (isTouchDevice()) {
    element.removeEventListener('touchend', handler);
  }
};

// Add swipe detection for mobile
export const detectSwipe = (element, callback) => {
  if (!element) return;
  
  let touchStartX = 0;
  let touchStartY = 0;
  let touchEndX = 0;
  let touchEndY = 0;
  
  // Set minimum distance for swipe
  const minSwipeDistance = 50;
  
  element.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    touchStartY = e.changedTouches[0].screenY;
  }, false);
  
  element.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
  }, false);
  
  const handleSwipe = () => {
    const horizontalDistance = touchEndX - touchStartX;
    const verticalDistance = touchEndY - touchStartY;
    
    // Check if horizontal swipe is greater than vertical swipe
    if (Math.abs(horizontalDistance) > Math.abs(verticalDistance)) {
      if (Math.abs(horizontalDistance) > minSwipeDistance) {
        if (horizontalDistance > 0) {
          callback('right');
        } else {
          callback('left');
        }
      }
    } else {
      if (Math.abs(verticalDistance) > minSwipeDistance) {
        if (verticalDistance > 0) {
          callback('down');
        } else {
          callback('up');
        }
      }
    }
  };
}; 