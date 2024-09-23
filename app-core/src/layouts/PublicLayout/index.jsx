import React from 'react';
import styles from './styles.module.scss';
import { AppHeader } from '@/layouts';
import { LoginButton, NavigationBar } from '@/components';

const PublicLayout = ({ children }) => {
  return (
    <main className={[styles.PublicLayout].join(' ')}>
      <AppHeader mode={"public"}>
      <NavigationBar />
        <LoginButton />
      </AppHeader>
      <section>{children}</section>
    </main>
  );
};

export default PublicLayout;
