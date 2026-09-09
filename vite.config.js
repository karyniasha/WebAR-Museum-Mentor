import { resolve } from 'node:path'
import { defineConfig } from 'vite'
import { graciaPlugin } from '@gracia/web-sdk/vite-plugin'

export default defineConfig({
  base: '/WebAR-Museum-Mentor/',

  input: {
    main: resolve(import.meta.dirname, 'index.html'),
    graciaTest: resolve(import.meta.dirname, 'gracia-test.html'),
  },

  plugins: [
    ...graciaPlugin({
      bundle: 'aio',
      dedupe: true,
    }),
  ],
})