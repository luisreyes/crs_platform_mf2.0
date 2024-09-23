import React, { useContext, useEffect, useMemo } from 'react';
import { UserContext } from '@/contexts';
import { PublicLayout, PrivateLayout } from '@/layouts';

const LayoutRouter = ({ children, accessRoles, isPrivate, module }) => {
  const { roles: userRoles } = useContext(UserContext);

  // Memoize the access check to prevent unnecessary recalculations
  const canAccess = useMemo(
    () => accessRoles.some((role) => userRoles.includes(role)),
    [accessRoles, userRoles],
  );

  useEffect(() => {
    console.log('LayoutRouter', module);
    console.log(module, 'canAccess', canAccess, 'isPrivate', isPrivate);
  }, [module, canAccess, isPrivate]); // Updated dependency array

  // If the route is public, render the PublicLayout
  if (!isPrivate) {
    return <PublicLayout>{children}</PublicLayout>;
  } else if (isPrivate && !canAccess) {
    return <PrivateLayout>No Access</PrivateLayout>;
  } else {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
};

export default LayoutRouter;
