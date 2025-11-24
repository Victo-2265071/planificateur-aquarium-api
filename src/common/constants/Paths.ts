export default {
  Base: '/api',
  Poissons: {
    Base: '/poissons',
    Get: '/all',
  },
  GenerateToken: {
    Base: '/generatetoken',
    Post: '/',
  },
  Users: {
    Base: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
