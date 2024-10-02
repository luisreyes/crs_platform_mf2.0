import React, { useContext, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext, SecurityContext } from '@/contexts';
import { PublicLayout, PrivateLayout } from '@/layouts';

const LayoutRouter = ({ children, accessRoles = [], isPrivate }) => {
  const { roles: userRoles } = useContext(UserContext);
  const { isAuthenticated } = useContext(SecurityContext);
  const navigate = useNavigate();

  // Memoize the access check to prevent unnecessary recalculations
  const canAccess = useMemo(() => {
    // If no specific accessRoles are defined, allow access
    if (accessRoles.length === 0) return true;
    return accessRoles.some((role) => userRoles.includes(role));
  }, [accessRoles, userRoles]);

  useEffect(() => {
    if (isPrivate && isAuthenticated === false) {
      // Redirect unauthenticated users to the login page
      navigate('/login', { replace: true, state: { from: location.pathname } });
    }
  }, [isPrivate, isAuthenticated, navigate]);

  // Display a loading state while authentication status is being determined
  if (isPrivate && (isAuthenticated === null || isAuthenticated === undefined)) {
    return <div>Loading...</div>;
  }

  if (!isPrivate) {
    // If the route is public, render the PublicLayout
    return <PublicLayout>{children}</PublicLayout>;
  }

  if (isAuthenticated && canAccess) {
    // If the user is authenticated and has access, render the PrivateLayout
    return <PrivateLayout>{children}</PrivateLayout>;
  }

  // If the user is authenticated but does not have access, show "No Access"
  return <PrivateLayout>No Access</PrivateLayout>;
};

export default LayoutRouter;
