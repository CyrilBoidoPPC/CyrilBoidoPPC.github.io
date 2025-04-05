// Newsletter form functionality
export function initializeNewsletter() {
  const newsletterForm = document.querySelector(".footer-newsletter .newsletter-form");

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault(); // This stops the form from submitting
      window.location.reload(); // Reload the current page
    });
  }
}
