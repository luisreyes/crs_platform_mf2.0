import React, { Suspense, useContext } from 'react';
import { PublicLayout, PrivateLayout } from '@layouts';
import { Loading } from '@components';

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

const LayoutRouter = ({ content }) => {
  const { isRoles } = useContext(UserContext);
  return isRoles && isRoles.some((role) => role === 'Admin') ? (
    <PrivateLayout>{content}</PrivateLayout>
  ) : (
    <PublicLayout>{content}</PublicLayout>
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
