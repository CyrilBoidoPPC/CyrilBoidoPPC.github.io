// Testimonials slider functionality
export function initializeTestimonials() {
  const testimonialsTrack = document.getElementById("testimonialsTrack");
  const dotsContainer = document.getElementById("testimonialsDots");

  if (!testimonialsTrack || !dotsContainer) return;

  // Get all testimonial cards
  const testimonialCards = Array.from(testimonialsTrack.querySelectorAll(".testimonial-card"));
  const totalTestimonials = testimonialCards.length;

  // Current index
  let currentIndex = 0;

  // Create pagination dots
  const createDots = () => {
    dotsContainer.innerHTML = "";

    for (let i = 0; i < totalTestimonials; i++) {
      const dot = document.createElement("div");
      dot.classList.add("testimonial-dot");
      if (i === 0) dot.classList.add("active");

      dot.addEventListener("click", () => {
        goToSlide(i);
      });

      dotsContainer.appendChild(dot);
    }
  };

  // Update the active dot
  const updateDots = () => {
    const dots = dotsContainer.querySelectorAll(".testimonial-dot");
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
      index = totalTestimonials - 1;
    } else if (index >= totalTestimonials) {
      index = 0;
    }

    currentIndex = index;

    // Calculate the translation distance
    const translateX = -(currentIndex * 100);
    testimonialsTrack.style.transform = `translateX(${translateX}%)`;

    updateDots();
  };

  // Initialize dots
  createDots();

  // Touch events for mobile swiping
  let touchStartX = 0;
  let touchEndX = 0;

  testimonialsTrack.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoplay();
    },
    { passive: false }
  );

  testimonialsTrack.addEventListener(
    "touchmove",
    (e) => {
      e.preventDefault();
    },
    { passive: false }
  );

  testimonialsTrack.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoplay();
    },
    { passive: false }
  );

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
      goToSlide(currentIndex + 1);
    }, 5000); // Change slide every 5 seconds
  };

  const stopAutoplay = () => {
    clearInterval(autoplayInterval);
  };

  // Start autoplay
  startAutoplay();

  // Pause autoplay on hover or touch
  testimonialsTrack.addEventListener("mouseenter", stopAutoplay);

  // Resume autoplay when mouse leaves
  testimonialsTrack.addEventListener("mouseleave", startAutoplay);
}
