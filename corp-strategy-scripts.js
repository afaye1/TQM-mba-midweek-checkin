document.addEventListener('DOMContentLoaded', function () {
    // Elements
    const slideContainer = document.querySelector('.slide-container');
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;

    // Create navigation UI
    const navigationUI = document.createElement('div');
    navigationUI.className = 'presentation-navigation';
    navigationUI.innerHTML = `
        <div class="slide-progress">
            <span class="current-slide">1</span>
            <span class="total-slides">/ ${totalSlides}</span>
        </div>
        <div class="navigation-buttons">
            <button class="nav-button prev">Back</button>
            <button class="nav-button next">Next</button>
        </div>`;
    document.body.appendChild(navigationUI);

    const currentSlideElement = document.querySelector('.current-slide');
    let currentSlideIndex = 0;

    function goToSlide(index) {
        if (index < 0 || index >= totalSlides) return;
        slides[index].scrollIntoView({ behavior: 'smooth' });
        currentSlideIndex = index;
        currentSlideElement.textContent = currentSlideIndex + 1;
    }

    document.querySelector('.nav-button.prev').addEventListener('click', () => {
        goToSlide(currentSlideIndex - 1);
    });

    document.querySelector('.nav-button.next').addEventListener('click', () => {
        goToSlide(currentSlideIndex + 1);
    });

    // Optional: Resize listener updates counter on resize
    window.addEventListener('resize', () => {
        currentSlideElement.textContent = currentSlideIndex + 1;
    });

    // Initialize
    goToSlide(0);
});
