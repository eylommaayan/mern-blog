// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,          // ברירת-מחדל
    proxy: {
      // כל בקשה שמתחילה بـ /api תנותב ל-localhost:5000
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
        // אם אתה משתמש ב-cookie-s עם דומיין אחר:
        // cookieDomainRewrite: 'localhost'
      },
    },
  },
});
