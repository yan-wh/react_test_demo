import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  server: {
    port: 5000,
    proxy: {
      // http://localhost:3000/api -> http://localhost:3000/api
      // http://localhost:3000/api/foo -> http://localhost:3000/api/foo
      '/api': 'http://localhost:5001',
    },
  },
});
