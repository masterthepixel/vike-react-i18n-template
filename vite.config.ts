import react from '@vitejs/plugin-react-swc'
import vike from 'vike/plugin'
import { defineConfig } from 'vite'
import { fileURLToPath, URL } from "node:url"

export default defineConfig({
  plugins: [
    vike({
      prerender: true
    }),
    react()
  ],
  resolve: {
    alias: {
      // must also be defined in tsconfig!
      $: fileURLToPath(new URL(".", import.meta.url)),
    },
  },
})
