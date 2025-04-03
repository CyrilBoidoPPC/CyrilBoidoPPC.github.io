import { defineConfig } from "vite";
import htmlPurge from "vite-plugin-purgecss";

export default defineConfig({
  root: "./",
  build: {
    outDir: "dist",
  },
  plugins: [
    htmlPurge({
      content: ["./**/*.html", "./scripts/**/*.js"],
      safelist: ["open", "active", "show", "visible", "animated", "carousel-dot"], // Classes added by JavaScript
    }),
  ],
});
