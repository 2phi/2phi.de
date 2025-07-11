/**
 * Main application initialization
 */
import TooltipManager from './TooltipManager.js';

// Initialize application when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize tooltip functionality
  new TooltipManager();
  
  // Add any additional initialization logic here
  console.log('2phi website initialized successfully');
}); 