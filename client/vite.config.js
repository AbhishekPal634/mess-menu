import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // === TOP 1% FIX: Production Optimization ===
  esbuild: {
    // Automatically strip out console logs in production builds
    drop: ['console', 'debugger'],
  },
  build: {
    rollupOptions: {
      output: {
        // Splits massive third-party libraries (like React) into their own file
        // This ensures the browser caches React permanently, leading to instant loads.
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
});