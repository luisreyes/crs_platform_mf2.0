import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import { SecurityContext } from '@/contexts';
import styles from './styles.module.scss';

const LoginButton = ({style, variant}) => {
  
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
      <Button variant={variant || "outlined"} onClick={onLoginButtonClick} className={style==="float"? styles.Floating : "" }>
        {label}
      </Button>
    </>
  );
};

export default LoginButton;
