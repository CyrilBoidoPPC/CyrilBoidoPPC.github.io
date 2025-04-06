import { initializeHeader } from "/scripts/components/header.js";
import { initializeTestimonialBadges } from "/scripts/components/demandeTestimonials.js";

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize header
  initializeHeader();
  // Initialize Testimonial Badges
  initializeTestimonialBadges();
});
