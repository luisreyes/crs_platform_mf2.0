import React, { useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SecurityContext } from '@/contexts';
import { LoginButton } from '@/components';

const Login = () => {
  const { isAuthenticated } = useContext(SecurityContext);

  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated]);

  return (
    <>
      <h1>Login View</h1>
      <LoginButton />
    </>
  );
};

export default Login;
