import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // GitHub Pages serves this repository at /ghost-visualizer/. A custom domain
  // would serve from "/" and need this changed.
  base: "/ghost-visualizer/",
  plugins: [react()],
});
