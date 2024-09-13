import React, { Suspense, useContext } from 'react';
import { PublicLayout, PrivateLayout } from '@/layouts';
import { Loading } from '@/components';
import { useRemote } from '@/hooks';

import { remotes } from '../../remotes.json';

//Contexts
import {
  Providers,
  AppMonitorProvider,
  SecurityProvider,
  UserProvider,
  UserContext,
} from '@/contexts';

const providers = [
  [AppMonitorProvider, { connectionString: '' }],
  [SecurityProvider],
  [UserProvider],
];

// Dynamically create remote components
const createRemoteComponents = () => {
  return remotes.map(({scope, module, port}) => {
    const RemoteComponent = useRemote(scope, module, port);
    return (
      <Suspense fallback={<Loading />} key={`${scope}-${module}`}>
        <RemoteComponent />
      </Suspense>
    );
  });
};

const RemoteComponents = createRemoteComponents();

const View = () => {
  const { isRoles } = useContext(UserContext);

  return isRoles && isRoles.some((role) => role === 'Admin') ? (
    <PrivateLayout>
      {RemoteComponents}
    </PrivateLayout>
  ) : (
    <PublicLayout>{RemoteComponents}</PublicLayout>
  );
};

const ViewRouter = () => {
  return (
    <Providers providers={providers}>
      <Suspense fallback={<Loading />}>
        <View/>
      </Suspense>
    </Providers>
  );
};

export default ViewRouter;
