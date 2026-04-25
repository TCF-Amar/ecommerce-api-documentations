import React, { useState } from 'react';
import styles from './CodeBlock.module.css';

export default function CodeBlock({ lang, children }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.stopPropagation();
    navigator.clipboard.writeText(children).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className={styles.block}>
      <div className={styles.header}>
        <span className={styles.lang}>{lang}</span>
        <button
          className={`${styles.copyBtn} ${copied ? styles.copied : ''}`}
          onClick={handleCopy}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className={styles.content}>{children}</pre>
    </div>
  );
}
