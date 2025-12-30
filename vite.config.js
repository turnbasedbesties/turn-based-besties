import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Set base to '/' for a custom domain or a .github.io repo
// Set base to '/repo-name/' if hosted as a sub-project
export default defineConfig({
  plugins: [react()],
  base: '/', 
})
