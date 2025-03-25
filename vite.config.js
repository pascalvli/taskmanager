import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Get the correct port from Render
const PORT = process.env.PORT || 3000;

export default defineConfig({
  plugins: [react()],
  server: {
    port: PORT, // Use the Render-assigned port
    strictPort: true,
    host: "0.0.0.0", // Allow external access
  },
});
