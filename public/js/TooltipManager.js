/**
 * TooltipManager - Handles interactive tooltips for website elements
 */
class TooltipManager {
  constructor() {
    this.tooltip = null;
    this.tooltipTimeout = null;
    this.hideTimeout = null;
    this.init();
  }

  init() {
    // Create tooltip element
    this.tooltip = document.createElement('div');
    this.tooltip.className = 'tooltip';
    document.body.appendChild(this.tooltip);

    // Add event listeners
    document.addEventListener('mouseover', this.handleMouseOver.bind(this));
    document.addEventListener('mouseout', this.handleMouseOut.bind(this));
  }

  handleMouseOver(e) {
    const element = e.target.closest('[data-tooltip]');
    if (element) {
      const tooltipText = element.getAttribute('data-tooltip');
      if (tooltipText) {
        // Clear any existing timeouts
        if (this.tooltipTimeout) {
          clearTimeout(this.tooltipTimeout);
          this.tooltipTimeout = null;
        }
        if (this.hideTimeout) {
          clearTimeout(this.hideTimeout);
          this.hideTimeout = null;
        }
        
        // If tooltip is already showing, update immediately
        if (this.tooltip.classList.contains('show')) {
          this.showTooltip(tooltipText, element);
          setTimeout(() => {
            this.updateCachedPosition();
            this.positionTooltip();
          }, 50);
        } else {
          // Only delay if no tooltip is currently showing
          this.tooltipTimeout = setTimeout(() => {
            this.showTooltip(tooltipText, element);
            setTimeout(() => {
              this.updateCachedPosition();
              this.positionTooltip();
            }, 50);
          }, 400);
        }
      }
    }
  }

  handleMouseOut(e) {
    const element = e.target.closest('[data-tooltip]');
    if (element) {
      // Clear tooltip show delay if mouse leaves before tooltip appears
      if (this.tooltipTimeout) {
        clearTimeout(this.tooltipTimeout);
        this.tooltipTimeout = null;
      }
      
      // Add small delay before hiding to allow smooth transitions between elements
      if (this.hideTimeout) {
        clearTimeout(this.hideTimeout);
      }
      this.hideTimeout = setTimeout(() => {
        this.hideTooltip();
      }, 50);
    }
  }

  showTooltip(text, element) {
    this.tooltip.textContent = text;
    this.tooltip.classList.add('show');
    this.currentElement = element;
    // Initial position cache (will be updated after hover transform)
    this.cachedElementRect = element.getBoundingClientRect();
  }

  updateCachedPosition() {
    if (this.currentElement) {
      // Update cached position to use the scaled/transformed element
      this.cachedElementRect = this.currentElement.getBoundingClientRect();
    }
  }

  hideTooltip() {
    this.tooltip.classList.remove('show', 'top', 'bottom');
    this.currentElement = null;
    this.cachedElementRect = null;
    if (this.hideTimeout) {
      clearTimeout(this.hideTimeout);
      this.hideTimeout = null;
    }
  }

  positionTooltip(mouseEvent) {
    if (!this.tooltip.classList.contains('show') || !this.cachedElementRect) return;

    const rect = this.tooltip.getBoundingClientRect();
    
    // Always show below the element
    this.tooltip.classList.remove('top', 'bottom');
    this.tooltip.classList.add('bottom');
    
    // Position horizontally (center on element, not cursor)
    const elementCenterX = this.cachedElementRect.left + this.cachedElementRect.width / 2;
    let left = elementCenterX - rect.width / 2;
    const maxLeft = window.innerWidth - rect.width - 20;
    left = Math.max(20, Math.min(left, maxLeft));
    
    // Position vertically (use cached element position for stability)
    // Different spacing for different element types
    const isCodeLogo = this.currentElement.src && (
      this.currentElement.src.includes('weac.png') || 
      this.currentElement.src.includes('oracle.png') || 
      this.currentElement.src.includes('pypi.png')
    );
    const isAuthor = this.currentElement.classList.contains('author');
    
    let spacing;
    if (isAuthor) {
      spacing = 10; // More space for author containers
    } else if (isCodeLogo) {
      spacing = 25; // Further for code logos
    } else {
      spacing = 4; // Closer for institution logos
    }
    const top = this.cachedElementRect.bottom + spacing;
    
    this.tooltip.style.left = `${left}px`;
    this.tooltip.style.top = `${top}px`;
  }
}

export default TooltipManager; 