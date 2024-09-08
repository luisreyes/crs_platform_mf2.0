import React from 'react';
import styles from './styles.module.scss';

const AppHeader = ({ children }) => {
  return (
    <header className={[styles.AppHeader].join(' ')}>
      AppHeader
      {children}
    </header>
  );
};

export default AppHeader;
