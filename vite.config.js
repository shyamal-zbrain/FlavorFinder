import { defineConfig } from 'vite'
import { defineConfig as defineViteConfig } from 'vite';
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineViteConfig({
  plugins: [react()],
})
