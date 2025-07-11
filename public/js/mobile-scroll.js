/**
 * Mobile Scroll Highlighting
 * Provides visual feedback on touch devices through scroll-based element highlighting
 */

// Only run on touch devices
if ('ontouchstart' in window || navigator.maxTouchPoints > 0) {
  
  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -20% 0px', // Trigger when element is 20% into viewport
    threshold: 0.3
  };

  // Create intersection observer
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Add highlight class when element enters view
        entry.target.classList.add('scroll-highlight');
        
        // Remove highlight after animation completes
        setTimeout(() => {
          entry.target.classList.remove('scroll-highlight');
        }, 800);
      }
    });
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