import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Routes from '@/services/Routes';
import {
  Providers,
  AppMonitorProvider,
  SecurityProvider,
  UserProvider,
} from '@/contexts';

// Create router instance
const router = createBrowserRouter(Routes, {
  future: { v7_normalizeFormMethod: true },
});

// Define providers array more efficiently
const providers = [
  [AppMonitorProvider, { connectionString: '' }],
  [SecurityProvider],
  [UserProvider],
  [RouterProvider, { router }],
];

const AppBootstrap = () => <Providers providers={providers} />;

export default AppBootstrap;
