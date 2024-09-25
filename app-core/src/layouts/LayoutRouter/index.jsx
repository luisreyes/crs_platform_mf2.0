import React, { useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, SecurityContext } from '@/contexts';
import { PublicLayout, PrivateLayout } from '@/layouts';

const LayoutRouter = ({ children, accessRoles, isPrivate }) => {
  const { roles: userRoles } = useContext(UserContext);
  const { isAuthenticated } = useContext(SecurityContext);
  const navigate = useNavigate();

  // Memoize the access check to prevent unnecessary recalculations
  const canAccess = useMemo(
    () => accessRoles.some((role) => userRoles.includes(role)),
    [accessRoles, userRoles],
  );

  useEffect(() => {
    // If the route is private and the user is not logged in, redirect to the login page
    console.log("isAuthenticated", isAuthenticated);
    if (isPrivate && !isAuthenticated) {
      navigate('/login');
    }
  }, [isPrivate, isAuthenticated, navigate]);

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
