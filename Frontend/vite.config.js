// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import Icon from './src/assets/logo.jpg'
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'masked-icon.svg'],
      manifest: {
        name: 'My PWA App',
        short_name: 'MyPWA',
        description: 'A Progressive Web App built with Vite and React',
        theme_color: '#ffffff',
        icons: [
          {
            src: {Icon},
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: {Icon},
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '{Icon}',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
    }),
  ],
});
