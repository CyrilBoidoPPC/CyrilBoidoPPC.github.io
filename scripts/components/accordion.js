// Service accordion and FAQ accordion functionality
export function initServiceAccordion(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const showMoreButton = section.querySelector(".services-show-more");
  const cards = section.querySelectorAll(".service-card");

  if (showMoreButton) {
    showMoreButton.innerHTML = 'Voir plus <i class="fa-solid fa-chevron-down"></i>';

    showMoreButton.addEventListener("click", function () {
      const isExpanded = this.classList.contains("active");
      console.log("Button clicked, isExpanded:", isExpanded);

      if (isExpanded) {
        // Get button position before collapsing
        const buttonPosition = this.getBoundingClientRect().top;

        // Hide all cards beyond the first 2
        cards.forEach((card, index) => {
          if (index >= 2) {
            card.classList.remove("show");
          }
        });
        this.innerHTML = 'Voir plus <i class="fa-solid fa-chevron-down"></i>';

        // After layout is updated, scroll to maintain button position
        window.requestAnimationFrame(() => {
          const newButtonPosition = this.getBoundingClientRect().top;
          const scrollAdjustment = newButtonPosition - buttonPosition;

          window.scrollBy({
            top: scrollAdjustment,
            behavior: "smooth",
          });
        });
      } else {
        // Show all remaining cards without scrolling
        cards.forEach((card, index) => {
          if (index >= 2) {
            card.classList.add("show");
          }
        });
        this.innerHTML = 'Voir moins <i class="fa-solid fa-chevron-down"></i>';
        // No scroll behavior here - maintain current position
      }

      this.classList.toggle("active");
    });
  }
}

export function initializeFAQ() {
  const faqQuestions = document.querySelectorAll(".faq-question");

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
    });
  });
}
