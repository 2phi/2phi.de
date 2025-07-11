/**
 * Mobile Scroll Highlighting with Persistent Focus
 * Provides visual feedback and caption display for currently focused element on touch devices
 */

// Only run on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  
  let currentlyFocused = null;

  const observerOptions = {
    root: null,
    rootMargin: '-30% 0px -30% 0px', // Trigger when element is 30% into viewport
    threshold: 0.5
  };

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    // Find the entry with the highest intersection ratio
    let mostVisible = null;
    let maxRatio = 0;

    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > maxRatio) {
        maxRatio = entry.intersectionRatio;
        mostVisible = entry.target;
      }
    });

    // Update focus to most visible element
    if (mostVisible && mostVisible !== currentlyFocused) {
      // Remove focus from previous element
      if (currentlyFocused) {
        currentlyFocused.classList.remove('scroll-focused');
        currentlyFocused.classList.remove('show-caption');
      }

      // Add focus to new element
      currentlyFocused = mostVisible;
      currentlyFocused.classList.add('scroll-focused');
      currentlyFocused.classList.add('show-caption');
    }
    // If no element is sufficiently visible, clear focus
    else if (!mostVisible && currentlyFocused) {
      currentlyFocused.classList.remove('scroll-focused');
      currentlyFocused.classList.remove('show-caption');
      currentlyFocused = null;
    }
  }, observerOptions);

  // Wait for DOM to load
  document.addEventListener('DOMContentLoaded', () => {
    // Observe author cards and logo links
    const elementsToObserve = document.querySelectorAll('.author, .logo-link');
    
    elementsToObserve.forEach(element => {
      observer.observe(element);
    });

    // Add scroll-based highlighting class to body for CSS targeting
    document.body.classList.add('mobile-scroll-enabled');
  });
} 