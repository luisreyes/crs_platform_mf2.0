import React from 'react';
import styles from './styles.module.scss';

const AppFooter = ({ children }) => {
  return (
    <footer className={[styles.AppFooter].join(' ')}>
      {children}
    </footer>
  );
};

export default AppFooter;
