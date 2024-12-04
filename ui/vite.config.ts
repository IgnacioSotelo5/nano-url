import react from '@vitejs/plugin-react-swc'
import { defineConfig } from 'vite'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin({
    fix: true,
    include: ['src/**/*.ts', 'src/**/*.tsx'],
    exclude: ['node_modules/**'],
    emitWarning: true
  })],
  resolve: {
    alias: {
      '@': '/src',
      '@components': 'src/components'
    }
  }
})
