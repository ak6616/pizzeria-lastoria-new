import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { IncomingMessage } from 'http';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'middleware-uri-check',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            if (req.url) {
              decodeURI((req as IncomingMessage & { url: string }).url); // testujemy URI zanim Vite si� do niego dorwie
            } else {
              throw new Error('Request URL is undefined');
            }
            next();
          } catch (e) {
            console.warn('[URI MALFORMED]', req.url);
            res.statusCode = 400;
            res.end('400 Bad Request - URI malformed');
          }
        });
      },
    },
  ],
  server: {
    host: true,
    port: 443,
    strictPort: true,
    cors: true,
    https: {
      key: fs.readFileSync('/etc/letsencrypt/live/pizza-lastoria.pl/privkey.pem'),
      cert: fs.readFileSync('/etc/letsencrypt/live/pizza-lastoria.pl/fullchain.pem')
    },
    allowedHosts: ['pizza-lastoria.pl', 'www.pizza-lastoria.pl'],
    proxy: {
      '/api': {
        target: 'https://www.pizza-lastoria.pl:3000',
        changeOrigin: true,
        secure: true
      }
    },
  },
  // ?? Tu dodajemy middleware, kt�ry sprawdza poprawno�� URI
  
});
