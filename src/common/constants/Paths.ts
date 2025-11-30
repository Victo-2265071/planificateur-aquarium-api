export default {
  Base: '/api',
  Poissons: {
    Base: '/poissons',
    Get: '/all',
    GetFiltre: '/filtre',
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
  Aquariums: {
    Base: '/aquariums',
    GetOne: '/:id',
    GetAll: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
} as const;
