// Animation utilities
export function initializeAnimations() {
  // Add animation when cards come into view
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
}
