import React, { useContext } from 'react';
import { PublicLayout, PrivateLayout } from '@layouts';

//Contexts
import {
  Providers,
  AppMonitorProvider,
  SecurityProvider,
  UserProvider,
  UserContext,
} from '@contexts';

const providers = [
  [AppMonitorProvider, { connectionString: 'process.env.CONNECTION_STRING' }],
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
      <LayoutRouter>{children}</LayoutRouter>
    </Providers>
  );
};

export default AppLayout;
