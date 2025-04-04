import { defineConfig } from "vite";
import htmlPurge from "vite-plugin-purgecss";
import { resolve } from "path";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        // Consultation pages
        questionVoyance: resolve(__dirname, "consultation/question-voyance-gratuite.html"),
        rappel: resolve(__dirname, "consultation/se-faire-rappeler.html"),
        sms: resolve(__dirname, "consultation/voyance-par-sms.html"),
        tchat: resolve(__dirname, "consultation/voyance-par-tchat.html"),
        telephone: resolve(__dirname, "consultation/voyance-par-telephone.html"),
        sansCb: resolve(__dirname, "consultation/voyance-sans-cb.html"),
        // Demande pages
        details: resolve(__dirname, "demande/details.html"),
        confirmation: resolve(__dirname, "demande/confirmation.html"),
        // Divination pages
        astrologie: resolve(__dirname, "divination/astrologie.html"),
        mediumnite: resolve(__dirname, "divination/mediumnite.html"),
        numerologie: resolve(__dirname, "divination/numerologie.html"),
        tarologie: resolve(__dirname, "divination/tarologie.html"),
        voyance: resolve(__dirname, "divination/voyance.html"),
        // Legal pages
        cgvu: resolve(__dirname, "legal/cgvu.html"),
        confidentialite: resolve(__dirname, "legal/confidentialite.html"),
        donnees: resolve(__dirname, "legal/donnees-personnelles.html"),
        mentions: resolve(__dirname, "legal/mentions-legales.html"),
        partenaires: resolve(__dirname, "legal/partenaires.html"),
        protection: resolve(__dirname, "legal/protection-donnees.html"),
        // Other pages
        contact: resolve(__dirname, "contact.html"),
      },
    },
  },
  plugins: [
    htmlPurge({
      content: ["./**/*.html", "./scripts/**/*.js"],
      safelist: ["open", "active", "show", "visible", "animated", "carousel-dot", "visually-hidden", "testimonial-dot"], // Classes added by JavaScript
    }),
  ],
});
