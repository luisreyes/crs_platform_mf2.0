import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { UserContext } from '@/contexts';
import routesConfig from '~/routes.json'; // Import routes from routes.json file
import styles from './styles.module.scss';

const NavigationBar = () => {
  const { roles } = useContext(UserContext);

  // Function to check if the user has access to a private route
  const hasAccess = (routeRoles, isPrivate) => {
    // If route is public (isPrivate: false), everyone can access it
    if (!isPrivate) return true;
    // Check if the user has one of the required roles for private routes
    return routeRoles.some((role) => roles.includes(role));
  };

  return (
    <nav className={styles.NavigationBar}>
      <ul>
        {routesConfig.map(({ path, module, isPrivate, roles: routeRoles }) => {
          // Only render the link if the user has access (public or role-based)
          if (hasAccess(routeRoles, isPrivate)) {
            return (
              <li key={path}>
                <NavLink
                  to={path}
                  end={path === "/"} // Handle root route special case
                  className={({ isActive, isPending, isTransitioning }) =>
                    [
                      isPending ? styles.pending : '',
                      isActive ? styles.active : '',
                      isTransitioning ? styles.transitioning : ''
                    ].join(' ')
                  }
                >
                  {module}
                </NavLink>
              </li>
            );
          }
          return null; // Don't render if access is restricted
        })}
      </ul>
    </nav>
  );
};

export default NavigationBar;
