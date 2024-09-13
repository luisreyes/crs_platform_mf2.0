import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [pluginReact()],
  html: { title: 'CRS - Audits' },
  server: {
    port: 3030,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
  },
  tools: {
    rspack: {
      output: {
        // You need to set a unique value that is not equal to other applications
        uniqueName: 'audits_provider',
      },
      plugins: [
        new ModuleFederationPlugin({
          remoteType: 'script',
          isServer: true,
          name: 'audits_provider',
          exposes: {
            './Audits': './src/view/App.jsx'
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

