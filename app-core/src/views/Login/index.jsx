import React, { useContext, useEffect } from 'react';
import styles from './styles.module.scss';
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
    <section className={styles.Login}>
      <div className={styles.container}>
        <h1>Login View</h1>
      </div>
      <hr />
      <div className={styles.container}>
        <LoginForm />
      </div>
    </section>
  );
};

const LoginForm = () => {
  return (
    <form>
      <div>
        {/* <label htmlFor="email">Email</label> */}
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
        />
      </div>
      <div>
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
        />
      </div>
      <LoginButton />
    </form>
  );
};

export default Login;
