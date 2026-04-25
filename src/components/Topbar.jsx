import React from 'react';
import styles from './Topbar.module.css';

export default function Topbar() {
  return (
    <div className={styles.topbar}>
      <div className={styles.title}>E-Commerce REST API</div>
      <div className={styles.badges}>
        <span className={styles.badgeV}>v1.0.0</span>
        <span className={styles.badgeR}>REST</span>
      </div>
    </div>
  );
}
