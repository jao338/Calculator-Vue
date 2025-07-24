import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import checker from 'vite-plugin-checker';
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    tailwindcss(),
    checker({
      vueTsc: true,
    }),
  ],
});
