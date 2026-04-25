import React, { useState } from 'react';
import styles from './EndpointCard.module.css';
import CodeBlock from './CodeBlock';

const METHOD_LABELS = {
  GET: styles.get,
  POST: styles.post,
  PATCH: styles.patch,
  DELETE: styles.del,
};

export default function EndpointCard({ method, path, desc, auth, admin, body }) {
  const [open, setOpen] = useState(false);

  const hasBody = body && Object.keys(body).length > 0;

  const renderPath = (p) => {
    const parts = p.split(/(:[\w]+)/g);
    return parts.map((part, i) =>
      part.startsWith(':') ? (
        <span key={i} className={styles.param}>{part}</span>
      ) : (
        part
      )
    );
  };

  return (
    <div className={`${styles.card} ${open ? styles.open : ''}`}>
      <div className={styles.header} onClick={() => setOpen((v) => !v)}>
        <span className={`${styles.method} ${METHOD_LABELS[method]}`}>{method}</span>
        <span className={styles.path}>{renderPath(path)}</span>
        {auth && !admin && <span className={styles.authBadge}>🔒 Auth</span>}
        {admin && <span className={styles.authBadge}>🔒 Auth</span>}
        {admin && <span className={styles.adminBadge}>👑 Admin</span>}
        {desc && <span className={styles.desc}>{desc}</span>}
        <span className={styles.chevron}>▼</span>
      </div>

      {open && hasBody && (
        <div className={styles.body}>
          {body.params && (
            <>
              <p className={styles.paramLabel}>Request Body</p>
              <table className={styles.paramTable}>
                <thead>
                  <tr>
                    <th>Field</th><th>Type</th><th>Required</th><th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {body.params.map((p) => (
                    <tr key={p.name}>
                      <td className={styles.pName}>{p.name}</td>
                      <td className={styles.pType}>{p.type}</td>
                      <td className={p.required ? styles.pReq : styles.pOpt}>
                        {p.required ? 'required' : 'optional'}
                      </td>
                      <td className={styles.pDesc}>{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {body.queryParams && (
            <>
              <p className={styles.paramLabel}>Query Parameters</p>
              <table className={styles.paramTable}>
                <thead>
                  <tr>
                    <th>Param</th><th>Type</th><th>Required</th><th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {body.queryParams.map((p) => (
                    <tr key={p.name}>
                      <td className={styles.pName}>{p.name}</td>
                      <td className={styles.pType}>{p.type}</td>
                      <td className={p.required ? styles.pReq : styles.pOpt}>
                        {p.required ? 'required' : 'optional'}
                      </td>
                      <td className={styles.pDesc}>{p.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}

          {body.note && <p className={styles.note}>{body.note}</p>}

          {body.request && (
            <CodeBlock lang="Request">{body.request}</CodeBlock>
          )}

          {body.response && (
            <CodeBlock lang="Response 200">{body.response}</CodeBlock>
          )}

          {body.example && (
            <CodeBlock lang="Example">{body.example}</CodeBlock>
          )}
        </div>
      )}
    </div>
  );
}
