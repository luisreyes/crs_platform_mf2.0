import React from 'react';
import styles from './styles.module.scss';
import { AppHeader } from '@layouts';
import { LoginButton } from '@components';

const PrivateLayout = ({ children }) => {
  return (
    <main className={[styles.PrivateLayout].join(' ')}>
      Private Layout
      <AppHeader>
        <LoginButton />
      </AppHeader>
      <section>{children}</section>
    </main>
  );
};

export default PrivateLayout;
