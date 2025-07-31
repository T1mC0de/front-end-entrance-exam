import { defineConfig } from 'vite';

export default defineConfig({

  base: '/front-end-entrance-exam/',
  plugins: [],
  optimizeDeps: {
    include: ['html2pdf.js'],
  },
});