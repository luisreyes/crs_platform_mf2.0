import React from 'react';
import styles from './styles.module.scss';

const AppHeader = ({ children }) => {
  return (
    <header className={[styles.AppHeader].join(' ')}>
      <div>AppHeader</div>
      {children}
    </header>
  );
};

export default AppHeader;
