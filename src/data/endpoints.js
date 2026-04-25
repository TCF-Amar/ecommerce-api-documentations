export const NAV_SECTIONS = [
  {
    label: 'Getting Started',
    items: [
      { icon: '⚡', label: 'Overview', id: 'overview' },
      { icon: '🔐', label: 'Authentication', id: 'auth-info' },
      { icon: '📦', label: 'Response Format', id: 'response-fmt' },
    ],
  },
  {
    label: 'Endpoints',
    items: [
      { icon: '🔑', label: 'Auth', id: 'auth-ep' },
      { icon: '🛍️', label: 'Products', id: 'products-ep' },
      { icon: '🗂️', label: 'Categories', id: 'categories-ep' },
      { icon: '🛒', label: 'Cart', id: 'cart-ep' },
      { icon: '📋', label: 'Orders', id: 'orders-ep' },
      { icon: '❤️', label: 'Wishlist', id: 'wishlist-ep' },
      { icon: '👤', label: 'Users', id: 'users-ep' },
      { icon: '📊', label: 'Admin', id: 'admin-ep' },
    ],
  },
  {
    label: 'Reference',
    items: [
      { icon: '⚠️', label: 'Error Codes', id: 'errors-ep' },
    ],
  },
];

export const AUTH_ENDPOINTS = [
  {
    method: 'POST',
    path: '/auth/register',
    desc: 'Create account',
    auth: false,
    admin: false,
    body: {
      params: [
        { name: 'name', type: 'string', required: true, desc: 'min 2 characters' },
        { name: 'email', type: 'string', required: true, desc: 'valid email' },
        { name: 'password', type: 'string', required: true, desc: 'min 6 characters' },
      ],
      example: `POST /api/v1/auth/register

{
  "name": "Amar Dev",
  "email": "amar@test.com",
  "password": "Test@1234"
}`,
    },
  },
  {
    method: 'POST',
    path: '/auth/login',
    desc: 'Get JWT token',
    auth: false,
    admin: false,
    body: {
      request: `POST /api/v1/auth/login
{ "email": "user@shop.com", "password": "User@123" }`,
      response: `{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "user": { "id": "clx...", "name": "Demo User", "role": "USER" }
  }
}`,
    },
  },
  {
    method: 'GET',
    path: '/auth/me',
    desc: 'My profile',
    auth: true,
    admin: false,
    body: {
      example: `GET /api/v1/auth/me\nAuthorization: Bearer <token>`,
    },
  },
  {
    method: 'POST',
    path: '/auth/refresh',
    desc: 'Refresh access token',
    auth: false,
    admin: false,
    body: {
      example: `POST /api/v1/auth/refresh\n\n{\n  "refreshToken": "REPLACE_WITH_REFRESH_TOKEN"\n}`,
    },
  },
  {
    method: 'POST',
    path: '/auth/logout',
    desc: 'Logout user',
    auth: true,
    admin: false,
    body: {
      example: `POST /api/v1/auth/logout\nAuthorization: Bearer <token>`,
    },
  },
];

export const PRODUCT_ENDPOINTS = [
  {
    method: 'GET',
    path: '/products',
    desc: 'List with filters',
    auth: false,
    admin: false,
    body: {
      queryParams: [
        { name: 'page', type: 'number', required: false, desc: 'Default: 1' },
        { name: 'limit', type: 'number', required: false, desc: 'Default: 20, Max: 100' },
        { name: 'category', type: 'string', required: false, desc: 'Category slug e.g. smartphones' },
        { name: 'search', type: 'string', required: false, desc: 'Search by name or description' },
        { name: 'minPrice', type: 'number', required: false, desc: 'Minimum price filter' },
        { name: 'maxPrice', type: 'number', required: false, desc: 'Maximum price filter' },
        { name: 'sort', type: 'enum', required: false, desc: 'price_asc | price_desc | rating | newest' },
        { name: 'tags', type: 'string', required: false, desc: 'Comma-separated: samsung,flagship' },
      ],
      example: `# All products
GET /api/v1/products

# Filter by category + price
GET /api/v1/products?category=laptops&minPrice=50000&sort=price_asc

# Search with pagination
GET /api/v1/products?search=iphone&page=1&limit=10`,
    },
  },
  {
    method: 'GET',
    path: '/products/:slug',
    desc: 'Single product + reviews',
    auth: false,
    admin: false,
    body: { example: 'GET /api/v1/products/samsung-galaxy-s24-ultra' },
  },
  {
    method: 'POST',
    path: '/products',
    desc: 'Create product',
    auth: true,
    admin: true,
    body: {
      example: `{
  "name": "New Product",
  "price": 9999,
  "comparePrice": 12999,
  "stock": 50,
  "sku": "SKU-001",
  "images": ["https://example.com/image.jpg"],
  "tags": ["electronics", "new"],
  "categoryId": "clx..."
}`,
    },
  },
  {
    method: 'PATCH',
    path: '/products/:id',
    desc: 'Update product',
    auth: true,
    admin: true,
    body: { example: '{ "stock": 100, "price": 8999 }' },
  },
  {
    method: 'DELETE',
    path: '/products/:id',
    desc: 'Soft delete',
    auth: true,
    admin: true,
    body: { note: 'Soft delete only — sets isActive: false. Order history preserved.' },
  },
];

export const CATEGORY_ENDPOINTS = [
  {
    method: 'GET',
    path: '/categories',
    desc: 'All 25 categories',
    auth: false,
    admin: false,
    body: {
      example: `[{ "id": "clx...", "name": "Smartphones", "slug": "smartphones", "_count": { "products": 10 } }, ...]`,
    },
  },
  {
    method: 'GET',
    path: '/categories/:slug',
    desc: 'Single category',
    auth: false,
    admin: false,
    body: { example: 'GET /api/v1/categories/smartphones' },
  },
  {
    method: 'POST',
    path: '/categories',
    desc: 'Create category',
    auth: true,
    admin: true,
    body: { example: '{ "name": "New Category", "description": "...", "image": "https://..." }' },
  },
  {
    method: 'PATCH',
    path: '/categories/:id',
    desc: 'Update category',
    auth: true,
    admin: true,
    body: { example: '{ "name": "Updated Name" }' },
  },
];

export const CART_ENDPOINTS = [
  {
    method: 'GET',
    path: '/cart',
    desc: 'Get cart + totals',
    auth: true,
    admin: false,
    body: {
      example: `{ "items": [...], "subtotal": 124999, "savings": 10000, "totalItems": 2 }`,
    },
  },
  {
    method: 'POST',
    path: '/cart/items',
    desc: 'Add item',
    auth: true,
    admin: false,
    body: { example: '{ "productId": "clx...", "quantity": 2 }' },
  },
  {
    method: 'PATCH',
    path: '/cart/items/:itemId',
    desc: 'Update qty (0 = remove)',
    auth: true,
    admin: false,
    body: { example: '{ "quantity": 3 } // send 0 to remove item' },
  },
  {
    method: 'DELETE',
    path: '/cart/items/:itemId',
    desc: 'Remove item',
    auth: true,
    admin: false,
    body: {},
  },
  {
    method: 'DELETE',
    path: '/cart',
    desc: 'Clear entire cart',
    auth: true,
    admin: false,
    body: {},
  },
];

export const ORDER_ENDPOINTS = [
  {
    method: 'POST',
    path: '/orders',
    desc: 'Place order from cart',
    auth: true,
    admin: false,
    body: {
      request: '{ "addressId": "clx...", "note": "Deliver before 6PM" }',
      response: `{ "orderNumber": "ORD-20260424-1234", "status": "PENDING", "totalAmount": 124999 }`,
    },
  },
  {
    method: 'GET',
    path: '/orders/my',
    desc: 'My orders (paginated)',
    auth: true,
    admin: false,
    body: { example: 'GET /api/v1/orders/my?page=1&limit=10' },
  },
  {
    method: 'GET',
    path: '/orders/my/:id',
    desc: 'Single order',
    auth: true,
    admin: false,
    body: {},
  },
  {
    method: 'PATCH',
    path: '/orders/my/:id/cancel',
    desc: 'Cancel + restore stock',
    auth: true,
    admin: false,
    body: { note: 'Only PENDING or CONFIRMED orders can be cancelled. Stock is automatically restored.' },
  },
  {
    method: 'GET',
    path: '/orders',
    desc: 'All orders + status filter',
    auth: true,
    admin: true,
    body: { example: 'GET /api/v1/orders?status=PENDING&page=1' },
  },
  {
    method: 'PATCH',
    path: '/orders/:id/status',
    desc: 'Update order status',
    auth: true,
    admin: true,
    body: {
      note: 'Flow: PENDING → CONFIRMED → PROCESSING → SHIPPED → DELIVERED | CANCELLED',
      example: '{ "status": "SHIPPED" }',
    },
  },
];

export const WISHLIST_ENDPOINTS = [
  { method: 'GET', path: '/wishlist', desc: 'Get wishlist', auth: true, admin: false, body: {} },
  {
    method: 'POST',
    path: '/wishlist',
    desc: 'Add to wishlist',
    auth: true,
    admin: false,
    body: { example: '{ "productId": "clx..." }' },
  },
  { method: 'DELETE', path: '/wishlist/:productId', desc: 'Remove', auth: true, admin: false, body: {} },
  {
    method: 'POST',
    path: '/wishlist/:productId/move-to-cart',
    desc: 'Move to cart',
    auth: true,
    admin: false,
    body: { note: 'Adds product to cart and removes from wishlist in one call.' },
  },
  {
    method: 'GET',
    path: '/wishlist/:productId/check',
    desc: 'Check if in wishlist',
    auth: true,
    admin: false,
    body: { example: '{ "inWishlist": true }' },
  },
];

export const USER_ENDPOINTS = [
  { method: 'GET', path: '/users/addresses', desc: 'Get addresses', auth: true, admin: false, body: {} },
  {
    method: 'POST',
    path: '/users/addresses',
    desc: 'Add address',
    auth: true,
    admin: false,
    body: {
      example: `{
  "name": "Amar Kumar", "phone": "9876543210",
  "line1": "123 MG Road", "city": "Satna",
  "state": "Madhya Pradesh", "pincode": "485001",
  "isDefault": true
}`,
    },
  },
  {
    method: 'DELETE',
    path: '/users/addresses/:id',
    desc: 'Delete address',
    auth: true,
    admin: false,
    body: {},
  },
  {
    method: 'POST',
    path: '/users/reviews',
    desc: 'Submit review (must be DELIVERED)',
    auth: true,
    admin: false,
    body: { example: '{ "productId": "clx...", "rating": 5, "comment": "Excellent product!" }' },
  },
];

export const ADMIN_ENDPOINTS = [
  {
    method: 'GET',
    path: '/admin/dashboard',
    desc: 'Revenue, orders, users, stock',
    auth: false,
    admin: true,
    body: {
      example: `{
  "revenue": { "total": 450000, "thisMonth": 120000, "growthPercent": 23.5 },
  "orders": { "total": 152, "pending": 12 },
  "users": { "total": 89, "newThisMonth": 14 },
  "products": { "total": 200, "lowStock": 7 }
}`,
    },
  },
  {
    method: 'GET',
    path: '/admin/revenue/chart',
    desc: 'Daily revenue (chart ready)',
    auth: false,
    admin: true,
    body: {
      example: `GET /api/v1/admin/revenue/chart?days=30
// Returns: [{ "date": "2026-04-01", "revenue": 45000 }, ...]`,
    },
  },
  { method: 'GET', path: '/admin/orders/status', desc: 'Pie chart data', auth: false, admin: true, body: {} },
  {
    method: 'GET',
    path: '/admin/products/top',
    desc: 'Best-selling products',
    auth: false,
    admin: true,
    body: { example: 'GET /api/v1/admin/products/top?limit=10' },
  },
  {
    method: 'GET',
    path: '/admin/products/low-stock',
    desc: 'Restock alerts',
    auth: false,
    admin: true,
    body: { example: 'GET /api/v1/admin/products/low-stock?threshold=10' },
  },
  { method: 'GET', path: '/admin/categories/top', desc: 'Top revenue categories', auth: false, admin: true, body: {} },
  {
    method: 'GET',
    path: '/admin/orders/recent',
    desc: 'Latest orders feed',
    auth: false,
    admin: true,
    body: { example: 'GET /api/v1/admin/orders/recent?limit=10' },
  },
];

export const ERROR_CODES = [
  { status: '200', code: 'OK', meaning: 'Success', color: 'var(--green)' },
  { status: '201', code: 'Created', meaning: 'Resource created', color: 'var(--blue)' },
  { status: '400', code: 'Bad Request', meaning: 'Validation failed or invalid input', color: 'var(--yellow)' },
  { status: '401', code: 'Unauthorized', meaning: 'Missing or invalid JWT token', color: 'var(--red)' },
  { status: '403', code: 'Forbidden', meaning: 'Insufficient role (need ADMIN)', color: 'var(--red)' },
  { status: '404', code: 'Not Found', meaning: "Resource doesn't exist", color: 'var(--red)' },
  { status: '409', code: 'Conflict', meaning: 'Duplicate email / already reviewed', color: 'var(--orange)' },
  { status: '429', code: 'Rate Limit', meaning: 'Too many requests (100/15min)', color: 'var(--red)' },
  { status: '500', code: 'Server Error', meaning: 'Internal error — check logs', color: 'var(--red)' },
];
