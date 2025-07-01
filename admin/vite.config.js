import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    hmr: {
      clientPort: 443, // Avoids unnecessary WebSocket errors
      protocol: 'wss'  // Forces secure WebSocket
    },
    proxy: {
      '/api': {
        target: 'http://localhost:4000', // 👈 Replace with your backend server
        changeOrigin: true,
        secure: false,
      },
    },
  }
})
