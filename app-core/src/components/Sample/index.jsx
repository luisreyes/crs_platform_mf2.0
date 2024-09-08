import React from 'react';
import styles from './styles.module.scss';

const Sample = ({ value }) => {
  return <div className={[styles.sample].join(' ')}>{value}</div>;
};

export default Sample;
