import React, { Suspense, useContext } from 'react';
import { PublicLayout, PrivateLayout } from '@layouts';
import { Loading } from '@components';
import { Remotes } from '@services';

//Contexts
import {
  Providers,
  AppMonitorProvider,
  SecurityProvider,
  UserProvider,
  UserContext,
} from '@contexts';

const providers = [
  [AppMonitorProvider, { connectionString: '' }],
  [SecurityProvider],
  [UserProvider],
];

const LayoutRouter = ({ children }) => {
  const { isRoles } = useContext(UserContext);
  
  Remotes.initRemotes([{
    name: 'dashboard_provider',
    entry: 'http://localhost:3020/mf-manifest.json',
  }]);

  const RemoteDashboard = Remotes.useRemote('dashboard_provider', 'Dashboard');

  return isRoles && isRoles.some((role) => role === 'Admin') ? (
    <PrivateLayout>
      <Suspense fallback={<Loading />}>
        <RemoteDashboard />
      </Suspense>
      {children}
    </PrivateLayout>
  ) : (
    <PublicLayout>{children}</PublicLayout>
  );
};

const AppLayout = ({ children }) => {
  return (
    <Providers providers={providers}>
      <Suspense fallback={<Loading />}>
        <LayoutRouter>{children}</LayoutRouter>
      </Suspense>
    </Providers>
  );
};

export default AppLayout;
