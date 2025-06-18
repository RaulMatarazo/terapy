import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// src/main.js ou src/main.tsx
import './src/css/tailwind.css';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
