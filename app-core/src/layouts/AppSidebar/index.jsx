import React from 'react';
import styles from './styles.module.scss';

const AppSidebar = ({ children }) => {
  return (
    <aside className={[styles.AppSidebar].join(' ')}>
      {children}
    </aside>
  );
};

export default AppSidebar;
