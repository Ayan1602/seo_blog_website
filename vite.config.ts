import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',   // ✅ this line fixes broken asset paths on Vercel
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
