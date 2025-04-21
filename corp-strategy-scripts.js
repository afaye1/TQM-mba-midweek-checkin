document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slide');
    const slideContainer = document.querySelector('.slide-container');
    const slideCounter = document.querySelector('.slide-counter');
    const prevButton = document.getElementById('prevSlide');
    const nextButton = document.getElementById('nextSlide');
    let currentSlideIndex = 0;
  
    // Function to update the slide counter
    function updateSlideCounter() {
      slideCounter.textContent = `${currentSlideIndex + 1} / ${slides.length}`;
    }
  
    // Function to go to a specific slide
    function goToSlide(index) {
      if (index < 0) {
        currentSlideIndex = slides.length - 1; // Loop to last slide
      } else if (index >= slides.length) {
        currentSlideIndex = 0; // Loop to first slide
      } else {
        currentSlideIndex = index;
      }
  
      slideContainer.scrollTo({
        top: slides[currentSlideIndex].offsetTop,
        behavior: 'smooth'
      });
  
      updateSlideCounter();
    }
  
    // Event listeners for Next and Previous buttons
    prevButton.addEventListener('click', function() {
      goToSlide(currentSlideIndex - 1);
    });
  
    nextButton.addEventListener('click', function() {
      goToSlide(currentSlideIndex + 1);
    });
  
    // Event listeners for keyboard arrow keys (Up/Down or Left/Right)
    document.addEventListener('keydown', function(event) {
      if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
        goToSlide(currentSlideIndex + 1);
      } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
        goToSlide(currentSlideIndex - 1);
      }
    });
  
    // Initialize slide counter and start with the first slide
    updateSlideCounter();
  });
  