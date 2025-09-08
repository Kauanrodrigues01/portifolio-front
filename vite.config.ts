import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // permite acessar por IP ou domínio
    port: 5173, // a porta que você estiver usando (opcional)
    strictPort: true,
    allowedHosts: ['portfolio.kauan.space'] // adicione seus domínios aqui
  }
})
