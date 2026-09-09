import { defineConfig } from 'vite'
import { graciaPlugin } from '@gracia/web-sdk/vite-plugin'

export default defineConfig({
  base: '/WebAR-Museum-Mentor/',
  plugins: [
    ...graciaPlugin({
      bundle: 'core',
      dedupe: true,
    }),
  ],
})