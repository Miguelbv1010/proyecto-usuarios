import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const name = process.env.CODESPACE_NAME // p.ej. legendary-fishstick-...

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: true,
    https: true,
    // ⚠️ NO usar port:443 aquí. El proxy de Codespaces se encarga.
    hmr: name
      ? {
          host: `${name}-3000.app.github.dev`,
          protocol: 'wss',
          // no pongas port aquí
          // si tu versión exige clientPort, prueba clientPort: 443 (no abre puerto local)
        }
      : true,
  },
})
