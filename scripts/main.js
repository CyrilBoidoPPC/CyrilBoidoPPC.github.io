// Import all components
import { initializeHeader } from "./components/header.js";
import { initializeForms } from "./components/forms.js";
import { initializeCarousel } from "./components/carousel.js";
import { initializeTestimonials } from "./components/testimonials.js";
import { initServiceAccordion, initializeFAQ } from "./components/accordion.js";
import { initializeAnimations } from "./utils/animations.js";

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize header
  initializeHeader();

  // Initialize forms
  initializeForms();

  // Initialize testimonials slider
  initializeTestimonials();

  // Initialize carousels
  initializeCarousel("consultationCarouselTrack", "consultationCarouselDots");
  initializeCarousel("divinatoryCarouselTrack", "divinatoryCarouselDots");

  // Initialize accordions
  initServiceAccordion("services-section");
  initServiceAccordion("divinatory-section");

  // Initialize FAQ
  initializeFAQ();

  // Initialize animations
  initializeAnimations();
});
