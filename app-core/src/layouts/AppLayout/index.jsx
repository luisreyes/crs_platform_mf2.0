import React, { Suspense, useContext } from 'react';
import { PublicLayout, PrivateLayout } from '@layouts';
import { Loading } from '@components';
import { useRemote } from '@hooks';

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

const RemoteDashboard = useRemote('dashboard_provider', 'Dashboard', '3020');

const LayoutRouter = ({ children }) => {
  const { isRoles } = useContext(UserContext);

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
