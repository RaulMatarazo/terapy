import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// src/main.js ou src/main.tsx
import './tailwind.css';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
