import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: [
      { find: "@asset", replacement: path.resolve(__dirname, "src/asset") },
      { find: "@socket", replacement: path.resolve(__dirname, "src/socket") },
      { find: "@", replacement: path.resolve(__dirname, "src") },
    ],
  },
  server: {
    port: 4000,
  },
});
