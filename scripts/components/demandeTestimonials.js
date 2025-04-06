// Array of testimonial objects
const testimonials = [
  { quote: "Incroyable précision", name: "Marie L." },
  { quote: "Conseils très utiles", name: "Thomas B." },
  { quote: "Résultats bluffants", name: "Sophie M." },
  { quote: "Une aide précieuse", name: "Lucas P." },
  { quote: "Clarté exceptionnelle", name: "Julie D." },
  { quote: "Voyante talentueuse", name: "Pierre G." },
  { quote: "Prédictions réalisées", name: "Emma S." },
  { quote: "Expérience transformante", name: "Paul M." },
  { quote: "Réponses pertinentes", name: "Clara L." },
  { quote: "Très professionnelle", name: "David R." },
];

// Function to get random testimonials
function getRandomTestimonials(count) {
  // Create a copy of the array to avoid modifying the original
  const testimonialsCopy = [...testimonials];
  const result = [];

  // Get random testimonials
  for (let i = 0; i < count && testimonialsCopy.length > 0; i++) {
    const randomIndex = Math.floor(Math.random() * testimonialsCopy.length);
    result.push(testimonialsCopy.splice(randomIndex, 1)[0]);
  }

  return result;
}

// Function to render testimonial badges
export function initializeTestimonialBadges(count = 3) {
  const container = document.getElementById("testimonialBadges");

  // If the container doesn't exist, exit
  if (!container) return;

  const selectedTestimonials = getRandomTestimonials(count);

  // Create HTML for each testimonial
  selectedTestimonials.forEach((testimonial) => {
    const testimonialElement = document.createElement("div");
    testimonialElement.className = "testimonial-badge";

    testimonialElement.innerHTML = `
        <i class="fa-solid fa-quote-left"></i>
        <span class="testimonial-text">"${testimonial.quote}" - ${testimonial.name}</span>
      `;

    container.appendChild(testimonialElement);
  });
}
