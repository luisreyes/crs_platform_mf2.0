import React from 'react';
import styles from './styles.module.scss';

const Loading = ({ value }) => {
  return <div className={[styles.Loading].join(' ')}>{value}</div>;
};

export default Loading;
