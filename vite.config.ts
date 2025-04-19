import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import { VitePWA } from 'vite-plugin-pwa'


export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: 'Pizza Lastoria',
        short_name: 'Lastoria',
        start_url: '/',
        display: 'standalone',
        background_color: '#ffffff',
        theme_color: '#8a2be2',
        icons: [
          {
            src: '/zdjecia/logo-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/zdjecia/logo-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'document',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'html-cache',
            },
          },
          {
            urlPattern: ({ request }) => request.destination === 'script' || request.destination === 'style',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'assets-cache',
            },
          },
        ],
      },
    }),
    {
      name: 'middleware-uri-check',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          try {
            if (req.url) {
              decodeURI(req.url); 
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
  // 👇 Tu dodajemy middleware, który sprawdza poprawność URI
  
});
