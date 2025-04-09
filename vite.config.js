import { defineConfig } from "vite";
import htmlPurge from "vite-plugin-purgecss";
import { resolve } from "path";
import sitemap from "vite-plugin-sitemap";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
    assetsInlineLimit: 0,
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
  publicDir: "assets",
  plugins: [
    htmlPurge({
      content: ["./**/*.html", "./scripts/**/*.js"],
      safelist: ["open", "active", "show", "visible", "animated", "carousel-dot", "visually-hidden", "testimonial-dot"], // Classes added by JavaScript
    }),
    sitemap({
      hostname: "https://www.clairvoyances.fr",
      lastmod: new Date().toISOString().split("T")[0], // Format as YYYY-MM-DD
      changefreq: "monthly",
      priority: 1.0,
      exclude: ["/demande/*"], // Exclude legal pages if you want
      outDir: "dist", // Output directory should match your build outDir
      routes: [
        { path: "/", lastmod: new Date().toISOString().split("T")[0], changefreq: "weekly", priority: 1.0 },

        // Consultation pages - higher priority
        { path: "/consultation/question-voyance-gratuite.html", changefreq: "monthly", priority: 1.0 },
        { path: "/consultation/voyance-par-telephone.html", changefreq: "monthly", priority: 1.0 },
        { path: "/consultation/se-faire-rappeler.html", changefreq: "monthly", priority: 1.0 },
        { path: "/consultation/voyance-par-tchat.html", changefreq: "monthly", priority: 1.0 },
        { path: "/consultation/voyance-sans-cb.html", changefreq: "monthly", priority: 1.0 },
        { path: "/consultation/voyance-par-sms.html", changefreq: "monthly", priority: 1.0 },

        // Divination pages
        { path: "/divination/voyance.html", changefreq: "monthly", priority: 1.0 },
        { path: "/divination/mediumnite.html", changefreq: "monthly", priority: 1.0 },
        { path: "/divination/tarologie.html", changefreq: "monthly", priority: 1.0 },
        { path: "/divination/numerologie.html", changefreq: "monthly", priority: 1.0 },
        { path: "/divination/astrologie.html", changefreq: "monthly", priority: 1.0 },

        // Other important pages
        { path: "/contact.html", changefreq: "monthly", priority: 0.5 },

        // Legal pages - lower priority but still indexed
        { path: "/legal/mentions-legales.html", changefreq: "yearly", priority: 0.3 },
        { path: "/legal/cgvu.html", changefreq: "yearly", priority: 0.3 },
        { path: "/legal/confidentialite.html", changefreq: "yearly", priority: 0.3 },
        { path: "/legal/donnees-personnelles.html", changefreq: "yearly", priority: 0.3 },
        { path: "/legal/partenaires.html", changefreq: "yearly", priority: 0.3 },
        { path: "/legal/protection-donnees.html", changefreq: "yearly", priority: 0.3 },
      ],
    }),
  ],
});
