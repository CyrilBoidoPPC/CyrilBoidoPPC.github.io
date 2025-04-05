// Import all components
import { initializeHeader } from "/scripts/components/header.js";
import { initializeForms } from "/scripts/components/question.js";
import { initializeCarousel } from "/scripts/components/carousel.js";
import { initializeTestimonials } from "/scripts/components/testimonials.js";
import { initServiceAccordion, initializeFAQ } from "/scripts/components/accordion.js";
import { initializeAnimations } from "/scripts/utils/animations.js";
import { initializeNewsletter } from "/scripts/components/newsletter.js";

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

  // Initialize newsletter form
  initializeNewsletter();
});
