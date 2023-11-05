import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: '192.168.68.124', // Use '0.0.0.0' to bind to all available network interfaces
    port: 3000, // Set the port number to your preference
  },
})
