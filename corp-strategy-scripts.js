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

  // Function to go to a specific slide by index with precise control
  function goToSlide(index, options = {}) {
    const { 
      smooth = true, 
      updateIndex = true 
    } = options;

    // Ensure the index is within bounds
    const safeIndex = Math.max(0, Math.min(index, slides.length - 1));

    if (updateIndex) {
      currentSlideIndex = safeIndex;
    }

    // Scroll to the specific slide
    slides[safeIndex].scrollIntoView({
      behavior: smooth ? 'smooth' : 'instant',
      block: 'start'
    });

    updateSlideCounter();
  }

  // Function to find the slide index for a given element or ID
  function findSlideIndex(target) {
    // If target is a string (ID), find the corresponding element
    if (typeof target === 'string') {
      target = document.getElementById(target);
    }

    // Find the closest parent slide
    const slideElement = target.closest('.slide') || target;
    return Array.from(slides).indexOf(slideElement);
  }

  // Event listeners for Next and Previous buttons
  prevButton.addEventListener('click', function() {
    goToSlide(currentSlideIndex - 1);
  });

  nextButton.addEventListener('click', function() {
    goToSlide(currentSlideIndex + 1);
  });

  // Event listeners for keyboard arrow keys
  document.addEventListener('keydown', function(event) {
    switch(event.key) {
      case 'ArrowDown':
      case 'ArrowRight':
        event.preventDefault();
        goToSlide(currentSlideIndex + 1);
        break;
      case 'ArrowUp':
      case 'ArrowLeft':
        event.preventDefault();
        goToSlide(currentSlideIndex - 1);
        break;
    }
  });

  // Event listener for navigation links and case number clicks
  document.addEventListener('click', function(event) {
    // Check if the clicked element is a link or within a case link
    const link = event.target.closest('a[href^="#"]');
    const slideNumber = event.target.closest('.slide-number');

    if (link) {
      event.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetIndex = findSlideIndex(targetId);
      
      if (targetIndex !== -1) {
        goToSlide(targetIndex);
      }
    } else if (slideNumber) {
      // If slide number is clicked, go to the slide it's on
      const parentSlide = slideNumber.closest('.slide');
      if (parentSlide) {
        const targetIndex = findSlideIndex(parentSlide);
        if (targetIndex !== -1) {
          goToSlide(targetIndex);
        }
      }
    }
  });

  // Initialize slide counter and handle initial hash if present
  updateSlideCounter();
  
  if (window.location.hash) {
    const initialId = window.location.hash.substring(1);
    const initialSlide = document.getElementById(initialId);
    
    if (initialSlide) {
      const index = findSlideIndex(initialId);
      if (index !== -1) {
        goToSlide(index, { smooth: false });
      }
    }
  }
});