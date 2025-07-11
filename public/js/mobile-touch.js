/**
 * Universal Touch/Click Highlighting with Persistent Focus
 * Robust interaction highlighting and caption display for all devices
 */

// Run on all browsers for consistent experience
(function() {
  
  let currentlyFocused = null;
  let isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

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

  // Handle interaction events (touch or click)
  function handleInteraction(event) {
    // Find the closest interactive element
    const targetElement = event.target.closest('.author, .logo-link');
    
    if (targetElement) {
      // Prevent default behavior for touch events
      if (event.type === 'touchstart') {
        event.preventDefault();
      }
      
      // If interacting with the same element, clear focus (toggle off)
      if (targetElement === currentlyFocused) {
        clearCurrentFocus();
      } else {
        // Focus on the new element
        setFocus(targetElement);
      }
    } else {
      // Touched/clicked outside interactive elements, clear focus
      clearCurrentFocus();
    }
  }

  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    // Add touch-based highlighting class to body for CSS targeting
    document.body.classList.add('mobile-touch-enabled');

    // Add event listeners to the container
    const container = document.querySelector('.container');
    
    if (container) {
      if (isTouchDevice) {
        // Touch devices: prioritize touch events
        container.addEventListener('touchstart', handleInteraction, { passive: false });
        // Also add click as fallback
        container.addEventListener('click', (event) => {
          if (!event.target.closest('a')) {
            handleInteraction(event);
          }
        });
      } else {
        // Non-touch devices: use click events
        container.addEventListener('click', (event) => {
          if (!event.target.closest('a')) {
            handleInteraction(event);
          }
        });
      }
    }

    // Clear focus when interacting outside the container
    const clearOutsideHandler = (event) => {
      if (!event.target.closest('.container')) {
        clearCurrentFocus();
      }
    };

    if (isTouchDevice) {
      document.addEventListener('touchstart', clearOutsideHandler, { passive: true });
    } else {
      document.addEventListener('click', clearOutsideHandler);
    }
  });
})(); 