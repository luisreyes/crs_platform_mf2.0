import React, { Suspense } from 'react';
import { Loading } from '@/components';
import { useRemote } from '@/hooks';
import { LayoutRouter } from '@/layouts';
import routesConfig from '~/routes.json';

// Dynamically create remote components
const getRemoteComponent = (scope, module, port, roles, isPrivate) => {
  const RemoteComponent = useRemote(scope, module, port, isPrivate);

  return (
    <Suspense fallback={<Loading />} key={`${scope}-${module}`}>
      <LayoutRouter accessRoles={roles} isPrivate={isPrivate} module={module}>
        <RemoteComponent />
      </LayoutRouter>
    </Suspense>
  );
};

const Routes = routesConfig.map(({ path, scope, module, port, roles, isPrivate }) => {
  return {
    path,
    element: getRemoteComponent(scope, module, port, roles, isPrivate),
  };
});

console.log("Routes", Routes);

export default Routes;
