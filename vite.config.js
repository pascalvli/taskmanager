import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Use a fixed port instead of relying on an environment variable
    strictPort: true,
    host: "0.0.0.0", // Required for Render to work
  },
});
