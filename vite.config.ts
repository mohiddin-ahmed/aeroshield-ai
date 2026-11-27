import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000
  },
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          groups: [
            {
              name: 'vendor-react',
              test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
              priority: 20
            },
            {
              name: 'vendor-genai',
              test: /[\\/]node_modules[\\/]@google[\\/]genai[\\/]/,
              priority: 15
            },
            {
              name: 'vendor-icons',
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              priority: 10
            }
          ]
        }
      }
    }
  }
});
