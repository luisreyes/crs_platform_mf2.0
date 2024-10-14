import React from 'react';
import styles from './styles.module.scss';
import '@/styles/global.scss';
import { AppSidebar, AppFooter } from '@/layouts';
import { NavigationBar } from '@/components';

const PrivateLayout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <main className={styles.PrivateLayout}>
      
      <AppSidebar>
        <NavigationBar />
      </AppSidebar>
      
      <section className={styles.Content}>{children}</section>
      
      <AppFooter>
        &copy;<span>{currentYear}</span> CRS Groups Innovations
      </AppFooter>

    </main>
  );
};

export default PrivateLayout;
