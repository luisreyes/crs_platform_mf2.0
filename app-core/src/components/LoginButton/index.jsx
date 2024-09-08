import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { UserContext, SecurityContext } from '@contexts';

const LoginButton = () => {
  const { isRoles } = useContext(UserContext);
  const { isAuthenticated, login, logout } = useContext(SecurityContext);
  const label = isAuthenticated ? 'Logout' : 'Login';

  const onLoginButtonClick = () => {
    if (!isAuthenticated) {
      login();
    } else {
      logout();
    }
  };

  return (
    <>
      User Role: {isRoles}
      <Button variant="outlined" onClick={onLoginButtonClick}>
        {label}
      </Button>
    </>
  );
};

export default LoginButton;
