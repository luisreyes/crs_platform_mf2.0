import React, { useContext } from 'react';
import styles from './styles.module.scss';
import '@/styles/global.scss';
import { AppHeader } from '@/layouts';
import { LoginButton } from '@/components';
import { UserContext } from '@/contexts';

const PrivateLayout = ({ children }) => {
  const { isRoles } = useContext(UserContext);
  return (
    <main className={[styles.PrivateLayout].join(' ')}>
      Private Layout
      <small className={"small"}>User Role: {isRoles}</small>
      <AppHeader>
        <LoginButton />
      </AppHeader>
      <section>{children}</section>
    </main>
  );
};

export default PrivateLayout;
