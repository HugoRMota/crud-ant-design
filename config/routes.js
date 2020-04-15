export default [
  {
    path: '/user',
    component: '../layouts/UserLayout',
    routes: [
      {
        name: 'login',
        path: '/user/login',
        component: './user/login',
      },
      {
        name: 'login',
        path: '/user/register',
        component: './user/register',
      },
    ],
  },
  {
    path: '/',
    component: '../layouts/SecurityLayout',
    routes: [
      {
        path: '/',
        component: '../layouts/BasicLayout',
        authority: ['admin', 'user'],
        routes: [
          {
            path: '/graphqlPage',
            name: 'gql',
            component: './graphPage',
          },
          {
            path: '/',
            name: 'Cadastro',
            icon: 'aliwangwang',
            routes: [
              {
                path: '/estados',

                name: 'Estados',
                icon: 'arrow-right',
                component: './estados',
              },
              {
                path: '/cidades',

                name: 'Cidades',
                icon: 'arrow-right',
                component: './cidades',
              },
              {
                path: '/categorias',

                name: 'Categorias',
                icon: 'arrow-right',
                component: './categorias',
              },
              {
                path: '/categories-drawer',

                name: 'Categorias com Drawer',
                icon: 'arrow-right',
                component: './categories-drawer',
              },

              {
                path: '/categories-page',
                name: 'Categorias em outra View',
                icon: 'arrow-right',
                component: './categories-page',
              },

              {
                path: '/categories-page/edit',
                component: './categories-page/edit',
              },
              {
                path: '/categories-page/edit/:id',
                component: './categories-page/edit',
              },
            ],
          },

          {
            path: '/admin',
            name: 'admin',
            icon: 'crown',
            component: './Admin',
            authority: ['admin'],
            routes: [
              {
                path: '/admin/sub-page',
                name: 'sub-page',
                icon: 'smile',
                component: './Welcome',
                authority: ['admin'],
              },
            ],
          },
          {
            component: './404',
          },
        ],
      },
      {
        component: './404',
      },
    ],
  },
  {
    component: './404',
  },
];
