/**
 * Mobile Touch Highlighting with Persistent Focus
 * Robust touch-based highlighting and caption display for mobile devices
 */

// Only run on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  
  let currentlyFocused = null;

  // Remove focus from current element
  function clearCurrentFocus() {
    if (currentlyFocused) {
      currentlyFocused.classList.remove('touch-focused');
      currentlyFocused.classList.remove('show-caption');
      currentlyFocused = null;
    }
  }

  // Set focus on new element
  function setFocus(element) {
    clearCurrentFocus();
    currentlyFocused = element;
    element.classList.add('touch-focused');
    element.classList.add('show-caption');
  }

  // Handle touch events
  function handleTouch(event) {
    // Find the closest interactive element
    const touchedElement = event.target.closest('.author, .logo-link');
    
    if (touchedElement) {
      // Prevent default to avoid unwanted behaviors
      event.preventDefault();
      
      // If touching the same element, clear focus (toggle off)
      if (touchedElement === currentlyFocused) {
        clearCurrentFocus();
      } else {
        // Focus on the new element
        setFocus(touchedElement);
      }
    } else {
      // Touched outside interactive elements, clear focus
      clearCurrentFocus();
    }
  }

  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    // Add touch-based highlighting class to body for CSS targeting
    document.body.classList.add('mobile-touch-enabled');

    // Add touch event listeners to the container
    const container = document.querySelector('.container');
    
    if (container) {
      // Use touchstart for immediate response
      container.addEventListener('touchstart', handleTouch, { passive: false });
      
      // Also handle clicks for hybrid devices
      container.addEventListener('click', (event) => {
        // Only handle if not a link click (let links work normally)
        if (!event.target.closest('a')) {
          handleTouch(event);
        }
      });
    }

    // Clear focus when touching outside the container
    document.addEventListener('touchstart', (event) => {
      if (!event.target.closest('.container')) {
        clearCurrentFocus();
      }
    }, { passive: true });
  });
} 