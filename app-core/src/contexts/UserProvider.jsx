import React, { useState, useContext, useEffect, createContext } from 'react';
import { AppMonitorContext, SecurityContext } from '@/contexts';

/**
 * A context to manage user information and roles.
 */
const UserContext = createContext(null);
const { Provider } = UserContext;

/**
 * A provider component for the UserContext.
 * @param {Object} props - The props for the component.
 * @param {Object} props.children - The child components to render.
 */
const UserProvider = (props) => {
  const { appMonitor } = useContext(AppMonitorContext);
  const { isAuthenticated } = useContext(SecurityContext);

  // Context's State
  const [roles, setRoles] = useState([]);

  // Context's Methods
  // NO PUBLIC METHODS

  // Get and set user roles on authentication change
  useEffect(() => {
    if (isAuthenticated) {
      // TODO: Get and set user roles.
      appMonitor.trackTrace('Set User Roles');
      setRoles(['Admin']);
      // setRoles(['User']);
      // setRoles(['Admin', 'User']);
      // setRoles(['User', 'Auditor']);
    } else {
      setRoles(['Public']);
    }
  }, [isAuthenticated]);

  // Values to provide to child components
  const values = {
    roles,
  };

  return <Provider value={values}>{props.children}</Provider>;
};

export { UserProvider, UserContext };
