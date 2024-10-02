import React, { useContext, useEffect, useState, createContext } from 'react';
import { AppMonitorContext } from '@/contexts';

const SecurityContext = createContext(null);
const { Provider } = SecurityContext;

// Utility functions to handle cookies
const setCookie = (name, value, days) => {
  const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  return parts.length > 1 ? parts.pop().split(';').shift() : null;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

// ----------------------------------------------------------------------- //
/**
 * A React component that provides security functionalities to the application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {JSX.Element} The rendered component.
 */
const SecurityProvider = ({ children }) => {
  const { appMonitor } = useContext(AppMonitorContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null); // Initialize as null

  useEffect(() => {
    const authCookie = getCookie('auth');
    if (authCookie === 'true') {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  /**
   * A method to log the user in.
   */
  const login = async () => {
    appMonitor.trackTrace('Log In Called');
    setIsAuthenticated(true);
    setCookie('auth', 'true', 7);
  };

  /**
   * A method to log the user out.
   */
  const logout = async () => {
    appMonitor.trackTrace('Log Out Called');
    setIsAuthenticated(false);
    deleteCookie('auth');
  };

  const values = { isAuthenticated, login, logout };

  return <Provider value={values}>{children}</Provider>;
};

export { SecurityProvider, SecurityContext };
