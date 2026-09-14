import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/listening-lab-7q4m9x2k/",
  build: {
    outDir: "github-pages",
    emptyOutDir: true,
    assetsDir: "",
  },
});
