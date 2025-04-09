const testimonials = [
  {
    quote: "Précision incroyable !",
    name: "Marie L.",
    rating: 4.8,
  },
  {
    quote: "Conseils vraiment utiles",
    name: "Thomas B.",
    rating: 4.5,
  },
  {
    quote: "Résultats bluffants",
    name: "Sophie M.",
    rating: 5.0,
  },
  {
    quote: "Aide précieuse",
    name: "Lucas P.",
    rating: 4.2,
  },
  {
    quote: "Clarté exceptionnelle",
    name: "Julie D.",
    rating: 4.7,
  },
  {
    quote: "Voyant talentueux",
    name: "Pierre G.",
    rating: 4.6,
  },
  {
    quote: "Prédictions confirmées",
    name: "Emma S.",
    rating: 4.9,
  },
  {
    quote: "Expérience transformante",
    name: "Paul M.",
    rating: 4.3,
  },
  {
    quote: "Réponses pertinentes",
    name: "Clara L.",
    rating: 4.4,
  },
  {
    quote: "Très professionnelle",
    name: "David R.",
    rating: 3.9,
  },
  {
    quote: "Cool",
    name: "Benoit C.",
    rating: 3.6,
  },
  {
    quote: "Correct",
    name: "Fatima B.",
    rating: 3.5,
  },
  {
    quote: "Voyance incroyable",
    name: "Amélie K.",
    rating: 4.7,
  },
  {
    quote: "Détails surprenants",
    name: "Nicolas F.",
    rating: 4.6,
  },
  {
    quote: "Conseils lumineux",
    name: "Laura M.",
    rating: 4.5,
  },
  {
    quote: "Perspective nouvelle",
    name: "Julien T.",
    rating: 4.4,
  },
  {
    quote: "Intuition remarquable",
    name: "Sarah B.",
    rating: 5.0,
  },
  {
    quote: "Lecture magique",
    name: "Antoine R.",
    rating: 4.8,
  },
  {
    quote: "Révélations précises",
    name: "Chloé P.",
    rating: 4.7,
  },
  {
    quote: "Guidance parfaite",
    name: "Mathieu L.",
    rating: 4.6,
  },
  {
    quote: "Énergies captées",
    name: "Emma D.",
    rating: 4.5,
  },
  {
    quote: "Conseil génial",
    name: "Kevin S.",
    rating: 4.3,
  },
  {
    quote: "Guidance incroyable",
    name: "Marie V.",
    rating: 4.7,
  },
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
export function initializeTestimonialBadges(count = 5) {
  const container = document.getElementById("testimonialBadges");

  // If the container doesn't exist, exit
  if (!container) return;

  const selectedTestimonials = getRandomTestimonials(count);

  // Create HTML for each testimonial
  selectedTestimonials.forEach((testimonial) => {
    const testimonialElement = document.createElement("div");
    testimonialElement.className = "testimonial-badge";

    testimonialElement.innerHTML = `
        <i class="fa-solid fa-star"></i>
        <span class="testimonial-text">${testimonial.rating}/5 - "${testimonial.quote}" - ${testimonial.name}</span>
      `;

    container.appendChild(testimonialElement);
  });
}
