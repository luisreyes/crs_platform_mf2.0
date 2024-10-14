import React from 'react';
import styles from './styles.module.scss';
import { AppSidebar } from '@/layouts';
import { LoginButton, NavigationBar } from '@/components';

const PublicLayout = ({ children }) => {
  const currentYear = new Date().getFullYear();
  return (
    <main className={[styles.PublicLayout].join(' ')}>
      <AppSidebar mode={"public"} id="main-header">
        <NavigationBar />
        <LoginButton />
      </AppSidebar>
      <section id="main-content">{children}</section>
      <footer id="main-footer">
        &copy;<span>{currentYear}</span> CRS Groups Innovations
      </footer>
    </main>
  );
};

export default PublicLayout;
