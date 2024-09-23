import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';
import { pluginSass } from '@rsbuild/plugin-sass';
import { ModuleFederationPlugin } from '@module-federation/enhanced/rspack';
import { dependencies } from './package.json';

export default defineConfig({
  plugins: [pluginReact(), pluginSass()],
  html: { title: 'CRS - Dashboard' },
  server: {
    port: 3020,
  },
  dev: {
    // It is necessary to configure assetPrefix, and in the production environment, you need to configure output.assetPrefix
    assetPrefix: true,
  },
  tools: {
    rspack: {
      output: {
        // You need to set a unique value that is not equal to other applications
        uniqueName: 'dashboard_provider',
      },
      plugins: [
        new ModuleFederationPlugin({
          remoteType: 'script',
          isServer: true,
          name: 'dashboard_provider',
          exposes: {
            './Dashboard': './src/view/Dashboard.jsx'
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

