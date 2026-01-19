import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // GitHub Pages configuration
  // For user/org pages (username.github.io): use base: '/'
  // For project pages (username.github.io/repo-name): use base: '/repo-name/'
  base: process.env.GITHUB_PAGES ? '/tourism-website/' : '/',
})

