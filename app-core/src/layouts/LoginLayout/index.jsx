import React from 'react';
import styles from './styles.module.scss';

const LoginLayout = ({ children }) => {
  const currentYear = new Date().getFullYear();

  return (
    <main className={styles.LoginLayout}>
      <section id="main-content">{children}</section>
      <footer id="main-footer">
        &copy;<span>{currentYear}</span> CRS Groups Innovations
      </footer>
    </main>
  );
};

export default LoginLayout;
