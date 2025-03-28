import { useState, useEffect } from 'react';
import { isTouchDevice } from '../utils/touchEvents';

/**
 * A custom hook to handle responsive behavior and device detection
 * @returns {Object} with isMobile, isTablet, isDesktop flags and current breakpoint
 */
const useResponsive = () => {
  // Define breakpoints (in pixels)
  const breakpoints = {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1200
  };
  
  // Initialize states
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  });
  
  const [isTouch, setIsTouch] = useState(isTouchDevice());
  
  // Function to update window size
  const handleResize = () => {
    setWindowSize({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };
  
  // Add event listeners on mount, remove on unmount
  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // Determine current device/breakpoint
  const isMobile = windowSize.width <= breakpoints.mobile;
  const isTablet = windowSize.width > breakpoints.mobile && windowSize.width <= breakpoints.tablet;
  const isLaptop = windowSize.width > breakpoints.tablet && windowSize.width <= breakpoints.laptop;
  const isDesktop = windowSize.width > breakpoints.laptop;
  
  // Determine current breakpoint name
  const getCurrentBreakpoint = () => {
    if (isMobile) return 'mobile';
    if (isTablet) return 'tablet';
    if (isLaptop) return 'laptop';
    return 'desktop';
  };
  
  return {
    isMobile,
    isTablet,
    isLaptop,
    isDesktop,
    isTouch,
    windowWidth: windowSize.width,
    windowHeight: windowSize.height,
    breakpoint: getCurrentBreakpoint()
  };
};

export default useResponsive; 