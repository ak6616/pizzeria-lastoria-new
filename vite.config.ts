import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host: true,       // Udost�pnia na sieci (0.0.0.0)
    port: 5173,       // Mo�esz zmieni� na inny port
    strictPort: true, // Zapewnia, �e Vite u�yje dok�adnie tego portu
    // https: false,     // Mo�esz w��czy� HTTPS (wymaga certyfikatu)
    cors: true, 
    
    allowedHosts: ['pizza-lastoria.pl', 'www.pizza-lastoria.pl'],      // W��cza CORS
    proxy: {          // Proxy dla backendu (je�li masz API na innym porcie)
      '/api': {
        target: 'https://www.pizza-lastoria.pl:3000',
        changeOrigin: true,
        secure: true
      }
    },
    // hmr: {
    //   protocol: 'wss',
    //   host: 'pizza-lastoria.pl',
    //   // port: 443
    // }
  }
});
