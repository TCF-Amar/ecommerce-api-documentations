import React from 'react';
import styles from './SectionBlock.module.css';

export default function SectionBlock({ id, icon, title, desc, children }) {
  return (
    <div className={styles.section} id={id}>
      <div className={styles.header}>
        <span className={styles.icon}>{icon}</span>
        <div className={styles.title}>{title}</div>
      </div>
      {desc && <p className={styles.desc}>{desc}</p>}
      {children}
    </div>
  );
}
