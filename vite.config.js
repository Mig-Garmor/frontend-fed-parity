import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Pages from "vite-plugin-pages";
import path from "path";

export default defineConfig({
  plugins: [
    vue(),
    Pages({
      dirs: [
        { dir: "src/pages", baseRoute: "" }, // 👈 add baseRoute explicitly
      ],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@styles": path.resolve(__dirname, "./src/styles"),
    },
  },
});
