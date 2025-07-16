/**
 * ==========================================================================
 * Universal Touch/Click Interaction System
 * ==========================================================================
 * 
 * Architecture Overview:
 * - Provides consistent interaction feedback across all device types
 * - Progressive enhancement: works without JavaScript
 * - Touch-first design with desktop hover fallbacks
 * - Accessible focus management and caption system
 * - Performance-optimized event handling
 */

(function() {
  'use strict';

  // ==========================================================================
  // Configuration & State Management
  // ==========================================================================

  /**
   * Application state for tracking user interactions
   * Centralized state management for predictable behavior
   */
  const InteractionState = {
    currentlyFocused: null,
    isTouchDevice: 'ontouchstart' in window || navigator.maxTouchPoints > 0,
    isInitialized: false
  };

  /**
   * Configuration object for customizable behavior
   * Allows easy modification of interaction parameters
   */
  const CONFIG = {
    // CSS classes for state management
    touchEnabledClass: 'mobile-touch-enabled',
    focusClass: 'touch-focused',
    captionClass: 'show-caption',
    
    // Selectors for interactive elements
    interactiveSelector: '.author, .logo-link',
    containerSelector: '.container',
    linkSelector: 'a',
    
    // Event options for performance
    passiveEventOptions: { passive: true },
    preventDefaultEventOptions: { passive: false }
  };

  // ==========================================================================
  // Focus Management System
  // ==========================================================================

  /**
   * Clears focus from the currently focused element
   * Ensures only one element can be focused at a time
   */
  function clearCurrentFocus() {
    if (InteractionState.currentlyFocused) {
      const element = InteractionState.currentlyFocused;
      element.classList.remove(CONFIG.focusClass);
      element.classList.remove(CONFIG.captionClass);
      InteractionState.currentlyFocused = null;
    }
  }

  /**
   * Sets focus on a new interactive element
   * Provides visual feedback and caption display
   * 
   * @param {HTMLElement} element - The element to focus
   */
  function setElementFocus(element) {
    if (!element) return;
    
    clearCurrentFocus();
    InteractionState.currentlyFocused = element;
    element.classList.add(CONFIG.focusClass);
    element.classList.add(CONFIG.captionClass);
  }

  /**
   * Determines if an element should receive focus
   * Validates element type and current state
   * 
   * @param {HTMLElement} element - Element to check
   * @returns {boolean} Whether the element should be focused
   */
  function shouldFocusElement(element) {
    return element && element.matches(CONFIG.interactiveSelector);
  }

  // ==========================================================================
  // Event Handling System
  // ==========================================================================

  /**
   * Core interaction handler for both touch and click events
   * Implements double-tap behavior: first tap highlights, second tap follows link
   * 
   * @param {Event} event - The interaction event (touch or click)
   */
  function handleInteraction(event) {
    // Find the closest interactive element in the event path
    const targetElement = event.target.closest(CONFIG.interactiveSelector);
    
    if (shouldFocusElement(targetElement)) {
      // Check if this element is already focused (second tap)
      if (targetElement === InteractionState.currentlyFocused) {
        // Second tap on already focused element - allow link to work
        // Don't preventDefault, let the browser handle the navigation
        return;
      } else {
        // First tap on this element - highlight it and prevent default
        if (event.type === 'touchstart') {
          event.preventDefault();
        }
        setElementFocus(targetElement);
      }
    } else {
      // Clicked outside interactive elements - clear all focus
      clearCurrentFocus();
    }
  }

  /**
   * Handles clicks outside the main container
   * Provides global focus clearing for better UX
   * 
   * @param {Event} event - The click or touch event
   */
  function handleOutsideInteraction(event) {
    if (!event.target.closest(CONFIG.containerSelector)) {
      clearCurrentFocus();
    }
  }

  /**
   * Specialized click handler that avoids conflicts with links
   * Prevents interaction handling when user intends to navigate
   * 
   * @param {Event} event - The click event
   */
  function handleClickEvent(event) {
    // Don't handle clicks on actual links to preserve navigation
    if (!event.target.closest(CONFIG.linkSelector)) {
      handleInteraction(event);
    }
  }

  // ==========================================================================
  // Event Listener Management
  // ==========================================================================

  /**
   * Registers event listeners for touch devices
   * Prioritizes touch events with click fallbacks
   * 
   * @param {HTMLElement} container - The main container element
   */
  function setupTouchEventListeners(container) {
    // Primary touch interaction
    container.addEventListener('touchstart', handleInteraction, CONFIG.preventDefaultEventOptions);
    
    // Click fallback for accessibility and hybrid devices
    container.addEventListener('click', handleClickEvent);
    
    // Global outside touch handling
    document.addEventListener('touchstart', handleOutsideInteraction, CONFIG.passiveEventOptions);
  }

  /**
   * Registers event listeners for non-touch devices
   * Uses click events for primary interaction
   * 
   * @param {HTMLElement} container - The main container element
   */
  function setupClickEventListeners(container) {
    // Primary click interaction
    container.addEventListener('click', handleClickEvent);
    
    // Global outside click handling
    document.addEventListener('click', handleOutsideInteraction);
  }

  /**
   * Sets up appropriate event listeners based on device capabilities
   * Determines touch vs. non-touch device behavior
   */
  function initializeEventListeners() {
    const container = document.querySelector(CONFIG.containerSelector);
    
    if (!container) {
      console.warn('Interaction system: Container element not found');
      return false;
    }

    if (InteractionState.isTouchDevice) {
      setupTouchEventListeners(container);
    } else {
      setupClickEventListeners(container);
    }

    return true;
  }

  // ==========================================================================
  // Initialization System
  // ==========================================================================

  /**
   * Initializes the interaction system
   * Sets up DOM classes and event listeners
   */
  function initializeInteractionSystem() {
    if (InteractionState.isInitialized) {
      return;
    }

    // Add CSS class for targeting enhanced interactions
    document.body.classList.add(CONFIG.touchEnabledClass);

    // Set up event listeners
    const success = initializeEventListeners();
    
    if (success) {
      InteractionState.isInitialized = true;
    }
  }

  /**
   * DOM ready handler with fallback for various loading states
   * Ensures initialization happens when DOM is ready
   */
  function handleDOMReady() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initializeInteractionSystem);
    } else {
      // DOM is already ready
      initializeInteractionSystem();
    }
  }

  // ==========================================================================
  // Module Initialization
  // ==========================================================================

  // Start the initialization process
  handleDOMReady();

})(); 