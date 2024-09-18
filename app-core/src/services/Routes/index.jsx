import React, { Suspense } from 'react';
import { Loading } from '@/components';
import { useRemote } from '@/hooks';
import { LayoutRouter } from '@/layouts';
import routesConfig from '~/routes.json';

// Dynamically create remote components
const getRemoteComponent = (scope, module, port, roles) => {
  const RemoteComponent = useRemote(scope, module, port);

  return (
    <Suspense fallback={<Loading />} key={`${scope}-${module}`}>
      <LayoutRouter accessRoles={roles}>
        <RemoteComponent />
      </LayoutRouter>
    </Suspense>
  );
};

const Routes = routesConfig.map(({ path, scope, module, port, roles }) => {
  return {
    path,
    element: getRemoteComponent(scope, module, port, roles),
  };
});

export const AllRoutes = [...Routes];
