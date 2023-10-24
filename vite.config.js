// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
//
// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePluginGhPages } from 'vite-plugin-gh-pages';

export default defineConfig({
  plugins: [
    react(),
    VitePluginGhPages({
      build: {
        // Дополнительные настройки сборки, если необходимо
      },
    }),
  ],
  // Другие настройки Vite...
});
