document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const slideContainer = document.querySelector('.slide-container');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    // Create navigation UI elements
    const navigationUI = document.createElement('div');
    navigationUI.className = 'presentation-navigation';
    navigationUI.innerHTML = `
        <div class="slide-progress">
            <span class="current-slide">1</span>
            <span class="total-slides">/ ${totalSlides}</span>
        </div>
        <div class="navigation-hint">
            <span class="hint-icon">↓</span>
            <span class="hint-text">Scroll to navigate</span>
        </div>
    `;
    document.body.appendChild(navigationUI);
    
    const currentSlideElement = document.querySelector('.current-slide');
    const navigationHint = document.querySelector('.navigation-hint');
    
    // Hide navigation hint after user has scrolled
    let scrolled = false;
    let hintTimeout;
    
    function handleScroll() {
        // Update visibility of navigation hint
        if (!scrolled && slideContainer.scrollTop > 50) {
            scrolled = true;
            navigationHint.classList.add('fade-out');
            
            // Show hint briefly when user pauses scrolling
            clearTimeout(hintTimeout);
            hintTimeout = setTimeout(() => {
                navigationHint.classList.remove('fade-out');
                setTimeout(() => {
                    navigationHint.classList.add('fade-out');
                }, 2000);
            }, 1500);
        }
        
        // Update current slide indicator
        updateCurrentSlide();
    }
    
    function updateCurrentSlide() {
        // Determine which slide is most visible
        let maxVisibleSlide = 0;
        let maxVisibleArea = 0;
        
        slides.forEach((slide, index) => {
            const rect = slide.getBoundingClientRect();
            const visibleTop = Math.max(0, rect.top);
            const visibleBottom = Math.min(window.innerHeight, rect.bottom);
            const visibleHeight = Math.max(0, visibleBottom - visibleTop);
            
            if (visibleHeight > maxVisibleArea) {
                maxVisibleArea = visibleHeight;
                maxVisibleSlide = index;
            }
        });
        
        // Update slide counter
        currentSlideElement.textContent = maxVisibleSlide + 1;
    }
    
    // Event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', updateCurrentSlide);
    
    // Initialize
    updateCurrentSlide();
});