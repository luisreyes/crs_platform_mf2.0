import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  html: { title: 'CRS - Shell' },
  server: {
    port: 3000,
  },
  tools: {
    rspack: {
      plugins: [
        new ModuleFederationPlugin({
          name: 'crs_consumer',
          experiments: { federationRuntime: 'hoisted' }, // TODO: Not working properly
          remotes: {
            core_provider:
              'core_provider@http://localhost:3010/mf-manifest.json',
          },
          shared: {
            ...dependencies,
            react: {
              singleton: true,
              requiredVersion: dependencies['react'],
            },
            'react-dom': {
              singleton: true,
              requiredVersion: dependencies['react-dom'],
            },
          },
        }),
      ],
    },
  },
});