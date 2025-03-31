document.addEventListener("DOMContentLoaded", () => {
  const toggles = document.querySelectorAll(".dropdown-toggle");
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const navbarMenu = document.querySelector(".navbar-menu");
  const textarea = document.getElementById("userQuestion");
  const charCount = document.getElementById("charCount");
  const clearButton = document.querySelector(".clear-button");
  const testimonialsTrack = document.getElementById("testimonialsTrack");
  const dotsContainer = document.getElementById("testimonialsDots");
  const faqQuestions = document.querySelectorAll(".faq-question");
  initializeCarousel("consultationCarouselTrack", "consultationCarouselDots");
  initializeCarousel("divinatoryCarouselTrack", "divinatoryCarouselDots");
  // Add this to your main.js file or create a new script
  // Mobile accordion behavior for services
  initServiceAccordion("services-section");
  initServiceAccordion("divinatory-section");

  function initServiceAccordion(sectionId) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const showMoreButton = section.querySelector(".services-show-more");
    const cards = section.querySelectorAll(".service-card");

    if (showMoreButton) {
      showMoreButton.innerHTML = 'Voir plus <i class="fa-solid fa-chevron-down"></i>';

      showMoreButton.addEventListener("click", () => {
        const isExpanded = showMoreButton.classList.contains("active");

        if (isExpanded) {
          // Hide all cards beyond the first 2
          cards.forEach((card, index) => {
            if (index >= 2) {
              card.classList.remove("show");
            }
          });
          showMoreButton.innerHTML = 'Voir plus <i class="fa-solid fa-chevron-down"></i>';
        } else {
          // Show all remaining cards
          cards.forEach((card, index) => {
            if (index >= 2) {
              card.classList.add("show");
            }
          });
          showMoreButton.innerHTML = 'Voir moins <i class="fa-solid fa-chevron-up"></i>';
        }

        showMoreButton.classList.toggle("active");

        // Smooth scroll to the third card when expanding
        if (!isExpanded) {
          const thirdCard = cards[2];
          if (thirdCard) {
            setTimeout(() => {
              thirdCard.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 100);
          }
        }
      });
    }
  }

  // Optional: Add animation when cards come into view
  if ("IntersectionObserver" in window) {
    const serviceCards = document.querySelectorAll(".service-card");

    const cardObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animated");
            cardObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    serviceCards.forEach((card) => {
      cardObserver.observe(card);
    });
  }

  // Add click event to each FAQ question
  faqQuestions.forEach((question) => {
    question.addEventListener("click", () => {
      // Toggle expanded state
      const isExpanded = question.getAttribute("aria-expanded") === "true";
      question.setAttribute("aria-expanded", !isExpanded);

      // Get the answer element
      const answer = question.nextElementSibling;

      // Toggle active class
      answer.classList.toggle("active");

      // Close other open questions
      faqQuestions.forEach((otherQuestion) => {
        if (otherQuestion !== question && otherQuestion.getAttribute("aria-expanded") === "true") {
          otherQuestion.setAttribute("aria-expanded", "false");
          otherQuestion.nextElementSibling.classList.remove("active");
        }
      });
    });
  });

  // Optional: Open the first FAQ item by default
  /*
    if (faqQuestions.length > 0) {
      faqQuestions[0].setAttribute("aria-expanded", "true");
      faqQuestions[0].nextElementSibling.classList.add("active");
    }
    */

  // Add the FAQ JavaScript functionality to the existing script.js
  // This is a standalone version for reference

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

  testimonialsTrack.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  });

  testimonialsTrack.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
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
  testimonialsTrack.addEventListener("touchstart", stopAutoplay);

  // Resume autoplay when mouse leaves
  testimonialsTrack.addEventListener("mouseleave", startAutoplay);
  testimonialsTrack.addEventListener("touchend", startAutoplay);

  function toggleClearButton() {
    if (textarea.value.length > 0) {
      clearButton.classList.add("visible");
    } else {
      clearButton.classList.remove("visible");
    }
  }

  textarea.addEventListener("input", toggleClearButton);

  clearButton.addEventListener("click", () => {
    textarea.value = "";
    document.getElementById("charCount").textContent = "0";
    toggleClearButton();
    textarea.focus();
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });

  if (textarea && charCount) {
    // Set initial height and count
    setTimeout(function () {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
      charCount.textContent = textarea.value.length;
    }, 0);

    // Update height and count on input
    textarea.addEventListener("input", function () {
      // Auto-resize
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";

      // Update character count
      charCount.textContent = this.value.length;

      // Change color when approaching limit
      if (this.value.length > 180) {
        charCount.style.color = "#DE3163";
        charCount.style.fontWeight = "bold";
        charCount.style.fontSize = "1rem";
      } else {
        charCount.style.color = "#777";
        charCount.style.fontWeight = "normal";
        charCount.style.fontSize = "0.8rem";
      }
    });
  }

  // Toggle dropdown menus
  toggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const parentDropdown = toggle.closest(".dropdown");
      parentDropdown.classList.toggle("open");

      const allDropdowns = document.querySelectorAll(".dropdown");
      allDropdowns.forEach((dropdown) => {
        if (dropdown !== parentDropdown) {
          dropdown.classList.remove("open");
        }
      });
    });
  });

  // Close dropdowns when clicking outside
  document.addEventListener("click", (event) => {
    document.querySelectorAll(".dropdown.open").forEach((dropdown) => {
      if (!dropdown.contains(event.target)) {
        dropdown.classList.remove("open");
      }
    });
  });

  // Toggle mobile menu
  hamburgerMenu.addEventListener("click", () => {
    navbarMenu.classList.toggle("open");
    hamburgerMenu.classList.toggle("active"); // Add this line to toggle active class
  });

  // Close mobile menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!navbarMenu.contains(event.target) && !hamburgerMenu.contains(event.target)) {
      navbarMenu.classList.remove("open");
      hamburgerMenu.classList.remove("active");
    }
  });
  toggleClearButton();
});
function initializeCarousel(trackId, dotsId) {
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
  });

  carouselTrack.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
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

  // Add navigation arrows for desktop (hidden on mobile)
  const createNavigation = () => {
    // For mobile compatibility, don't create actual DOM elements for navigation
    // We'll handle this with CSS visibility instead
  };

  createNavigation();

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
  carouselTrack.addEventListener("touchend", startAutoplay);

  // Handle window resize to adjust positioning
  window.addEventListener("resize", () => {
    goToSlide(currentIndex);
  });
}
