import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import { analyzer } from "vite-bundle-analyzer";

export default defineConfig({
  plugins: [react(), analyzer()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler", // or "modern"
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        // manualChunks: {
        // Вынесем React и React DOM в отдельный чанк
        // react: ["react", "react-dom"],
        // Вынесем библиотеки из node_modules
        // vendor: ['lodash', 'axios'],
        // },
        // Или используем функцию для более гибкого разделения
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("react")) {
              return "react"; // создаст отдельный чанк для react
            }
            if (id.includes("firebase")) {
              return "firebase"; // создаст отдельный чанк для Firebase
            }
            if (id.includes("@mui")) {
              return "mui"; // отдельный чанк для Material UI
            }
            if (id.includes("validator")) {
              return "validator"; // отдельный чанк для validator
            }
            return "vendor"; // все из node_modules — в один чанк
          }
        },
      },
    },
  },
});
