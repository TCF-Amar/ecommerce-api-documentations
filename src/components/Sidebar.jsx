import React from 'react';
import styles from './Sidebar.module.css';
import { NAV_SECTIONS } from '../data/endpoints';

export default function Sidebar({ activeId, onNav, isOpen, onClose }) {

  return (
    <>
      <div className={`${styles.overlay} ${isOpen ? styles.overlayVisible : ''}`} onClick={onClose} />
      <aside className={`${styles.sidebar} ${isOpen ? styles.open : ''}`}>
        <div className={styles.logo}>
          <div className={styles.logoRow}>
            <div className={styles.logoName}>ShopAPI</div>
            <button className={styles.closeBtn} onClick={onClose}>×</button>
          </div>
          <div className={styles.logoTag}>REST API v1.0</div>
        </div>

        <div className={styles.baseUrl}>
          <span className={styles.dot} />
          <a href={process.env.REACT_APP_API_BASE_URL} target="_blank" rel="noopener noreferrer"  >{process.env.REACT_APP_API_BASE_URL}</a>
        </div>

        <nav className={styles.nav}>
          {NAV_SECTIONS.map((section) => (
            <div key={section.label}>
              <div className={styles.navLabel}>{section.label}</div>
              {section.items.map((item) => (
                <div
                  key={item.id}
                  className={`${styles.navItem} ${activeId === item.id ? styles.active : ''}`}
                  onClick={() => onNav(item.id)}
                >
                  <span className={styles.navIcon}>{item.icon}</span>
                  {item.label}
                </div>
              ))}
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}
