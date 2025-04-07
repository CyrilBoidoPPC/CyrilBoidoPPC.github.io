import { initializeHeader } from "/scripts/components/header.js";
import { initializeTestimonialBadges } from "/scripts/components/demandeTestimonials.js";
import { initializeCountryCodeSelector } from "/scripts/components/countryCodeSelector.js";
import { initializeBirthdateFields } from "/scripts/components/datePicker.js";

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize header
  initializeHeader();
  // Initialize Date Picker
  initializeBirthdateFields();
  // Initialize Country Code Selector
  initializeCountryCodeSelector();
  // Initialize Testimonial Badges
  initializeTestimonialBadges();
});
