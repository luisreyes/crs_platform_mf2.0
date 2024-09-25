import React, { Suspense } from 'react';
import { Loading } from '@/components';
import { useRemote } from '@/hooks';
import { LayoutRouter } from '@/layouts';
import routesConfig from '~/routes.json';

// Dynamically create a component (either remote or local)
const getComponent = (scope, module, port, roles, isPrivate) => {
  let Component = null;

  // Check if remote config is present
  if (scope && port) {
    // Use remote component
    Component = useRemote(scope, module, port, isPrivate);
  } else {
    // Fallback to a local component
    Component = React.lazy(() => import(`@/views/${module}`));
  }
  return (
    <Suspense fallback={<Loading />} key={`${module}`}>
      <LayoutRouter accessRoles={roles} isPrivate={isPrivate}>
        <Component />
      </LayoutRouter>
    </Suspense>
  );
};

// Map over routes config to create route objects
const Routes = routesConfig.map(
  ({ path, scope, module, port, roles, isPrivate }) => ({
    path,
    element: getComponent(scope, module, port, roles, isPrivate),
  }),
);

console.log('Routes', Routes);

export default Routes;
