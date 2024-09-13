import React from 'react';
import styles from './styles.module.scss';
import { AppHeader } from '@/layouts';
import { LoginButton } from '@/components';

const PublicLayout = ({ children }) => {
  return (
    <main className={[styles.PublicLayout].join(' ')}>
      Public Layout
      <AppHeader>
        <LoginButton />
      </AppHeader>
      <section>{children}</section>
    </main>
  );
};

export default PublicLayout;
