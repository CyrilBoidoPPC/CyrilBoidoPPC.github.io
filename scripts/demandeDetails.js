import { initializeSpecialistType } from "/scripts/utils/referrerSpecialist.js";
import { initializeHeader } from "/scripts/components/header.js";
import { initializeTestimonialBadges } from "/scripts/components/demandeTestimonials.js";
import { initializeCountryCodeSelector } from "/scripts/components/countryCodeSelector.js";
import { initializeBirthdateFields } from "/scripts/components/datePicker.js";

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  // Initialize specialist type in header
  initializeSpecialistType();
  // Initialize header
  initializeHeader();
  // Initialize Date Picker
  initializeBirthdateFields();
  // Initialize Country Code Selector
  initializeCountryCodeSelector();
  // Initialize Testimonial Badges
  initializeTestimonialBadges();
});
