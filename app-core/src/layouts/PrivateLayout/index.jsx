import React, { useContext } from 'react';
import styles from './styles.module.scss';
import '@/styles/global.scss';
import { AppHeader } from '@/layouts';
import { LoginButton, NavigationBar } from '@/components';
import { UserContext } from '@/contexts';

const PrivateLayout = ({ children }) => {
  const { roles } = useContext(UserContext);

  return (
    <main className={styles.PrivateLayout}>
      <AppHeader mode={"private"}>
        <NavigationBar />
        <LoginButton />
      </AppHeader>
      <section>{children}</section>
      <footer>
        <small className="small">User Role: {roles.join(', ')}</small>
      </footer>
    </main>
  );
};

export default PrivateLayout;
