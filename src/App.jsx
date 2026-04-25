import React, { useState } from 'react';
import styles from './App.module.css';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import SectionBlock from './components/SectionBlock';
import EndpointCard from './components/EndpointCard';
import CodeBlock from './components/CodeBlock';
import { useActiveSection } from './hooks/useActiveSection';
import {
  AUTH_ENDPOINTS,
  PRODUCT_ENDPOINTS,
  CATEGORY_ENDPOINTS,
  CART_ENDPOINTS,
  ORDER_ENDPOINTS,
  WISHLIST_ENDPOINTS,
  USER_ENDPOINTS,
  ADMIN_ENDPOINTS,
  ERROR_CODES,
} from './data/endpoints';

const ALL_SECTION_IDS = [
  'overview', 'auth-info', 'response-fmt',
  'auth-ep', 'products-ep', 'categories-ep',
  'cart-ep', 'orders-ep', 'wishlist-ep',
  'users-ep', 'admin-ep', 'errors-ep',
];

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeId, setActiveId] = useActiveSection(ALL_SECTION_IDS);

  const handleNav = (id) => {
    setActiveId(id);
    setIsSidebarOpen(false); // Close drawer on mobile after selection
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className={styles.app}>
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "TechArticle",
          "headline": "ShopAPI | Professional Fake Store API & E-commerce Documentation",
          "description": "A free, production-ready Fake Store API for developers to build and test e-commerce applications.",
          "author": {
            "@type": "Organization",
            "name": "ShopAPI Team"
          },
          "about": [
            { "@type": "Thing", "name": "Fake Store API" },
            { "@type": "Thing", "name": "Mock E-commerce API" },
            { "@type": "Thing", "name": "REST API Reference" }
          ]
        })}
      </script>
      <Sidebar
        activeId={activeId}
        onNav={handleNav}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      <main className={styles.main}>
        <Topbar onMenuClick={() => setIsSidebarOpen(true)} />

        <div className={styles.content}>

          {/* HERO */}
          <div className={styles.hero} id="overview">
            <div className={styles.heroTitle}>ShopAPI: The Ultimate Fake Store API</div>
            <div className={styles.heroSub}>
              A 100% free, production-grade mock e-commerce backend — Node.js + TypeScript + PostgreSQL + Prisma + Redis + JWT.
            </div>
            <div className={styles.stats}>
              <div><div className={styles.statNum}>38+</div><div className={styles.statLbl}>Endpoints</div></div>
              <div><div className={styles.statNum}>200</div><div className={styles.statLbl}>Products</div></div>
              <div><div className={styles.statNum}>25</div><div className={styles.statLbl}>Categories</div></div>
              <div><div className={styles.statNum}>JWT</div><div className={styles.statLbl}>Auth</div></div>
            </div>
          </div>

          {/* AUTH INFO */}
          <SectionBlock
            id="auth-info"
            icon="🔐"
            title="Authentication"
            desc="ShopAPI uses a dual-token strategy — a short-lived accessToken (15 min) and a long-lived refreshToken (7 days). Protected routes require the accessToken in the Authorization header."
          >
            <CodeBlock lang="HTTP Header">{`Authorization: Bearer <accessToken>`}</CodeBlock>

            <div className={styles.infoGrid}>
              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>🧑 Demo User</div>
                <p>email: user@shop.com<br />password: User@123</p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>👑 Admin User</div>
                <p>email: admin@shop.com<br />password: Admin@123</p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>⏱️ Token Expiry</div>
                <p>accessToken: <strong>15 minutes</strong><br />refreshToken: <strong>7 days</strong></p>
              </div>
              <div className={styles.infoCard}>
                <div className={styles.infoCardTitle}>🍪 Cookie Support</div>
                <p>refreshToken auto-stored as <strong>httpOnly cookie</strong> — no manual handling needed</p>
              </div>
            </div>
          </SectionBlock>

          {/* RESPONSE FORMAT */}
          <SectionBlock id="response-fmt" icon="📦" title="Response Format"
            desc="Every response follows a consistent shape. Check success first, then read data.">
            <CodeBlock lang="JSON — Success">{`{
  "success": true,
  "message": "Products fetched",
  "data": [...],
  "meta": { "pagination": { "total": 200, "page": 1, "totalPages": 10 } }
}`}</CodeBlock>
            <CodeBlock lang="JSON — Error">{`{
  "success": false,
  "message": "Validation failed",
  "errors": [{ "field": "email", "message": "Invalid email" }]
}`}</CodeBlock>
          </SectionBlock>

          {/* AUTH ENDPOINTS */}
          <SectionBlock id="auth-ep" icon="🔑" title="Auth"
            desc="Register, login, refresh tokens, logout, and change password.">
            {AUTH_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* PRODUCTS */}
          <SectionBlock id="products-ep" icon="🛍️" title="Products"
            desc="Browse, search, and filter 200 products. Redis-cached for performance.">
            {PRODUCT_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* CATEGORIES */}
          <SectionBlock id="categories-ep" icon="🗂️" title="Categories"
            desc="25 pre-seeded categories. Each includes product count.">
            {CATEGORY_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* CART */}
          <SectionBlock id="cart-ep" icon="🛒" title="Cart"
            desc="User-specific cart. Auto-created on first add. Returns subtotal and savings on every response.">
            {CART_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* ORDERS */}
          <SectionBlock id="orders-ep" icon="📋" title="Orders"
            desc="Place order from cart. Stock atomically decremented via DB transaction. Price snapshotted at purchase time.">
            {ORDER_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* WISHLIST */}
          <SectionBlock id="wishlist-ep" icon="❤️" title="Wishlist"
            desc="Save products for later. Move to cart in one call.">
            {WISHLIST_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* USERS */}
          <SectionBlock id="users-ep" icon="👤" title="Users"
            desc="Manage addresses and submit product reviews.">
            {USER_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* ADMIN */}
          <SectionBlock id="admin-ep" icon="📊" title="Admin Analytics"
            desc="All admin routes require role: ADMIN. Results are Redis-cached (5–15 min).">
            {ADMIN_ENDPOINTS.map((ep) => <EndpointCard key={ep.path + ep.method} {...ep} />)}
          </SectionBlock>

          {/* ERRORS */}
          <SectionBlock id="errors-ep" icon="⚠️" title="Error Codes">
            <table className={styles.errTable}>
              <thead>
                <tr><th>Status</th><th>Code</th><th>Meaning</th></tr>
              </thead>
              <tbody>
                {ERROR_CODES.map((e) => (
                  <tr key={e.status}>
                    <td style={{ color: e.color, fontWeight: 500 }}>{e.status}</td>
                    <td style={{ color: 'var(--muted)' }}>{e.code}</td>
                    <td style={{ color: '#94a3b8' }}>{e.meaning}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </SectionBlock>

        </div>
      </main>
    </div>
  );
}