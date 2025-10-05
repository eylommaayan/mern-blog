/* client/postcss.config.js */
import tailwind from "@tailwindcss/postcss";   // ← מפה
import autoprefixer from "autoprefixer";

export default {
  plugins: [
    tailwind,          // ← לא "tailwindcss"
    autoprefixer,
  ],
};
