import React from 'react';
import styles from './Sidebar.module.css';
import { NAV_SECTIONS } from '../data/endpoints';

export default function Sidebar({ activeId, onNav }) {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoName}>ShopAPI</div>
        <div className={styles.logoTag}>REST API v1.0</div>
      </div>

      <div className={styles.baseUrl}>
        <span className={styles.dot} />
        <span>https://backent-ecommerce-production.up.railway.app/api/v1</span>
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
  );
}
