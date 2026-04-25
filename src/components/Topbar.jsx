import React from 'react';
import styles from './Topbar.module.css';

export default function Topbar({ onMenuClick }) {
  return (
    <div className={styles.topbar}>
      <div className={styles.left}>
        <button className={styles.menuBtn} onClick={onMenuClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
        <div className={styles.title}>E-Commerce REST API</div>
      </div>
      <div className={styles.badges}>
        <span className={styles.badgeV}>v1.0.0</span>
        <span className={styles.badgeR}>REST</span>
      </div>
    </div>
  );
}
