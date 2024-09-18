import React, { useContext, useMemo } from 'react';
import { UserContext } from '@/contexts';
import { PublicLayout, PrivateLayout } from '@/layouts';

const LayoutRouter = ({ accessRoles, children }) => {
  const { roles: userRoles } = useContext(UserContext);

  // Memoize the access check to prevent unnecessary recalculations
  const canAccess = useMemo(
    () => accessRoles.some((role) => userRoles.includes(role)),
    [accessRoles, userRoles],
  );

  // If the route is public (i.e., it allows 'Public' access), always render the PublicLayout
  if (accessRoles.includes('Public')) {
    return <PublicLayout>{children}</PublicLayout>;
  }

  // If the user can access the route based on roles, render the PrivateLayout
  return canAccess ? (
    <PrivateLayout>{children}</PrivateLayout>
  ) : (
    <PrivateLayout>No Access</PrivateLayout> // User lacks the necessary roles
  );
};

export default LayoutRouter;
