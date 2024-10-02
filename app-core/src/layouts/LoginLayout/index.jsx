import React from 'react';
import styles from './styles.module.scss';
import { AppHeader } from '@/layouts';
import { NavigationBar } from '@/components';

const LoginLayout = ({ children }) => {
  return (
    <main className={[styles.LoginLayout].join(' ')}>
      <AppHeader mode={"login"}>
        <NavigationBar />
      </AppHeader>
      <section>{children}</section>
    </main>
  );
};

export default LoginLayout;
