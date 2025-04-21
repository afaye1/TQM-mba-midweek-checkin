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

  // Function to go to a specific slide by index
  function goToSlide(index, shouldScroll = true) {
      if (index < 0) {
          currentSlideIndex = slides.length - 1; // Loop to last slide
      } else if (index >= slides.length) {
          currentSlideIndex = 0; // Loop to first slide
      } else {
          currentSlideIndex = index;
      }

      if (shouldScroll) {
          slideContainer.scrollTo({
              top: slides[currentSlideIndex].offsetTop,
              behavior: 'smooth'
          });
      }

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

  // Event listener for clicks on navigation links
  document.querySelectorAll('nav a').forEach(link => {
      link.addEventListener('click', function(event) {
          event.preventDefault(); // Prevent the default jump behavior
          const targetId = this.getAttribute('href').substring(1); // Get the id without the '#'
          const targetSlide = document.getElementById(targetId);
          if (targetSlide) {
              const index = Array.from(slides).indexOf(targetSlide);
              if (index !== -1) {
                  goToSlide(index); // Go to the slide using our function
              }
          }
      });
  });

  // Initialize slide counter and start with the first slide
  updateSlideCounter();

  // Optionally, if you want to handle initial load from a hash in the URL
  if (window.location.hash) {
      const initialId = window.location.hash.substring(1);
      const initialSlide = document.getElementById(initialId);
      if (initialSlide) {
          const index = Array.from(slides).indexOf(initialSlide);
          if (index !== -1) {
              goToSlide(index, false); // Go to the slide without extra scrolling on load
          }
      }
  }
});