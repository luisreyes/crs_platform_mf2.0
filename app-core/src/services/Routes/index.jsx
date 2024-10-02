import React, { Suspense } from 'react';
import { Loading } from '@/components';
import { useRemote } from '@/hooks';
import { LayoutRouter, LoginLayout } from '@/layouts';
import routesConfig from '~/routes.json';

// Dynamically create a component (either remote or local)
const getComponent = (scope, module, port, roles, isPrivate) => {
  // Use remote component if scope and port are defined, otherwise fallback to local
  const Component = scope && port
    ? useRemote(scope, module, port, isPrivate)
    : React.lazy(() => import(`@/views/${module}`));

  // For the "Login" module, don't use LayoutRouter
  if (module === 'Login') {
    return (
      <Suspense fallback={<Loading />} key={module}>
        <LoginLayout>
          <Component />
        </LoginLayout>
      </Suspense>
    );
  }

  return (
    <Suspense fallback={<Loading />} key={module}>
      <LayoutRouter accessRoles={roles} isPrivate={isPrivate}>
        <Component />
      </LayoutRouter>
    </Suspense>
  );
};

// Map over routes config to create route objects
const Routes = routesConfig.map(({ path, scope, module, port, roles, isPrivate }) => ({
  path,
  element: getComponent(scope, module, port, roles, isPrivate),
}));

export default Routes;
