import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(() => {
  const port = Number(import.meta.env.VITE_PORT) || 3000; // Use Vite's env system

  return {
    plugins: [react()],
    server: {
      port,
      strictPort: true,
      host: "0.0.0.0", // Required for Render
    },
  };
});
