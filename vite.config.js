import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // Allows access from any network interface
    allowedHosts : ["8199-104-28-222-177.ngrok-free.app",  "c668-104-28-254-177.ngrok-free.app"]
  },
})
