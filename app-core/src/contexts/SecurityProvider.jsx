import React, { useContext, useEffect, useState, createContext } from 'react';
import { AppMonitorContext } from '@/contexts';

const SecurityContext = createContext(null);
const { Provider } = SecurityContext;

// Utility functions to handle cookies
const setCookie = (name, value, days) => {
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000,
  ).toUTCString();
  document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  // console.log(`Set cookie: ${name}=${value}`);
};

const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  let cookie = parts.pop().split(';').shift() || null;
  // console.log(`Retrieved cookie: ${name}=${cookie}`);
  return cookie;
};

const deleteCookie = (name) => {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  // console.log(`Deleted cookie: ${name}`);
};

// ----------------------------------------------------------------------- //
/**
 * A React component that provides security functionalities to the application.
 * @param {object} props - The component props.
 * @param {React.ReactNode} props.children - The child components to render.
 * @return {JSX.Element} The rendered component.
 */
const SecurityProvider = (props) => {
  // The context used to access App Insights.
  const { appMonitor } = useContext(AppMonitorContext);

  // The state to track if the user is authenticated or not.
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // On initial load, check the authentication state from cookies
    const authCookie = getCookie('auth');
    if (authCookie === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  /**
   * A method to log the user in.
   * @return {Promise<void>} A promise that resolves when the login process is completed.
   */
  const login = async () => {
    appMonitor.trackTrace('Log In Called');
    setIsAuthenticated(true);
    setCookie('auth', 'true', 7); // Set cookie for 7 days
  };

  /**
   * A method to log the user out.
   * @return {Promise<void>} A promise that resolves when the logout process is completed.
   */
  const logout = async () => {
    appMonitor.trackTrace('Log Out Called');
    setIsAuthenticated(false);
    deleteCookie('auth');
  };

  // The list of methods to be exposed.
  const values = { isAuthenticated, login, logout };

  return (
    // The child component that sets the authentication state.
    <Authentication setIsAuthenticated={setIsAuthenticated}>
      {/* The context provider that exposes the security functionalities to the child components. */}
      <Provider value={values}>{props.children}</Provider>
    </Authentication>
  );
};

export { SecurityProvider, SecurityContext };

// ----------------------------------------------------------------------- //

const Authentication = ({ setIsAuthenticated, children }) => {
  useEffect(() => {
    // console.log('Security Provider Check');
    const authCookie = getCookie('auth');
    if (authCookie !== 'true') {
      setIsAuthenticated(false);
    }
  }, []);

  return <>{children}</>;
};
