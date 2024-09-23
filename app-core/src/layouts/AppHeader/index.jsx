import React from 'react';
import styles from './styles.module.scss';

const AppHeader = ({ children, mode }) => {
  return (
    <header className={[styles.AppHeader].join(' ')}>
      {mode}
      {children}
    </header>
  );
};

export default AppHeader;
