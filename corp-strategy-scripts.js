document.addEventListener('DOMContentLoaded', function() {
    // Create scroll indicator element
    const scrollIndicator = document.createElement('div');
    scrollIndicator.className = 'scroll-indicator';
    scrollIndicator.innerHTML = `
        <div class="scroll-text">Scroll Down</div>
        <div class="scroll-arrow">↓</div>
    `;
    document.body.appendChild(scrollIndicator);

    // Show the indicator only on the first few slides
    const slideContainer = document.querySelector('.slide-container');
    let scrollTimeout;
    let isVisible = true;

    // Hide indicator after scrolling
    function handleScroll() {
        if (slideContainer.scrollTop > window.innerHeight) {
            scrollIndicator.classList.add('hidden');
            isVisible = false;
        } else if (slideContainer.scrollTop < 100) {
            scrollIndicator.classList.remove('hidden');
            isVisible = true;
        }

        // Make indicator temporarily visible when user stops scrolling
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(function() {
            if (slideContainer.scrollTop < window.innerHeight * 3) {
                scrollIndicator.classList.remove('hidden');
                setTimeout(function() {
                    if (slideContainer.scrollTop > window.innerHeight) {
                        scrollIndicator.classList.add('hidden');
                    }
                }, 2000);
            }
        }, 1000);
    }

    slideContainer.addEventListener('scroll', handleScroll);

    // Pulse animation for the indicator
    setInterval(function() {
        if (isVisible) {
            scrollIndicator.classList.add('pulse');
            setTimeout(function() {
                scrollIndicator.classList.remove('pulse');
            }, 1000);
        }
    }, 3000);

    // Create slide counter
    const slideCounter = document.createElement('div');
    slideCounter.className = 'slide-counter';
    document.body.appendChild(slideCounter);

    // Update slide counter on scroll
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    
    function updateSlideCounter() {
        const slideHeight = window.innerHeight;
        const currentSlide = Math.round(slideContainer.scrollTop / slideHeight) + 1;
        slideCounter.textContent = `${currentSlide} / ${totalSlides}`;
    }

    slideContainer.addEventListener('scroll', updateSlideCounter);
    updateSlideCounter(); // Initialize counter
});