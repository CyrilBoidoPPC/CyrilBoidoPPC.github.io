// Carousel functionality
export function initializeCarousel(trackId, dotsId) {
  const carouselTrack = document.getElementById(trackId);
  const dotsContainer = document.getElementById(dotsId);

  if (!carouselTrack || !dotsContainer) return;

  // Get all carousel cards
  const carouselCards = Array.from(carouselTrack.querySelectorAll(".carousel-card"));
  const totalCards = carouselCards.length;

  // Current index
  let currentIndex = 0;

  // Create pagination dots
  const createDots = () => {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalCards; i++) {
      const dot = document.createElement("div");
      dot.classList.add("carousel-dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        goToSlide(i);
      });

      dotsContainer.appendChild(dot);
    }
  };

  // Update the active dot
  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll(".carousel-dot");
    dots.forEach((dot, index) => {
      if (index === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  };

  // Move to a specific slide
  const goToSlide = (index) => {
    // Ensure index is within bounds
    if (index < 0) {
      index = 0;
    } else if (index >= totalCards) {
      index = totalCards - 1;
    }

    currentIndex = index;

    // Calculate the translation distance (for 90% width cards + the gap)
    // This ensures we account for the 90% card width and 15px padding
    const cardWidth = carouselCards[0].offsetWidth;
    const translateX = -(currentIndex * cardWidth);
    carouselTrack.style.transform = `translateX(${translateX}px)`;

    updateDots();
  };

  // Initialize dots
  createDots();

  // Touch events for mobile swiping
  let touchStartX = 0;
  let touchEndX = 0;

  carouselTrack.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
    stopAutoplay();
  });

  carouselTrack.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
    startAutoplay();
  });

  const handleSwipe = () => {
    const swipeThreshold = 50;
    if (touchEndX < touchStartX - swipeThreshold) {
      // Swipe left - go to next slide
      goToSlide(currentIndex + 1);
    } else if (touchEndX > touchStartX + swipeThreshold) {
      // Swipe right - go to previous slide
      goToSlide(currentIndex - 1);
    }
  };

  // Auto-play functionality
  let autoplayInterval;

  const startAutoplay = () => {
    autoplayInterval = setInterval(() => {
      // Check if we're at the last slide, if so, go back to first
      const nextIndex = currentIndex === totalCards - 1 ? 0 : currentIndex + 1;
      goToSlide(nextIndex);
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // Start autoplay
  startAutoplay();

  // Pause autoplay on hover or touch
  carouselTrack.addEventListener("mouseenter", stopAutoplay);
  carouselTrack.addEventListener("touchstart", stopAutoplay);

  // Resume autoplay when mouse leaves
  carouselTrack.addEventListener("mouseleave", startAutoplay);

  // Handle window resize to adjust positioning
  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });
}
