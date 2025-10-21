import { defineConfig } from "vite";

export default defineConfig({
  root: ".",

  server: {
    host: true,
    port: Number(process.env.PORT) || 5173,
    open: true,
  },

  preview: {
    allowedHosts: ['vespav5.onrender.com'],
    host: true,
    port: Number(process.env.PORT) || 5173,
  },
});
