import { forbidAuthenticated, forbidUnauthenticated } from 'src/router/navigationGuard';
import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    beforeEnter: forbidUnauthenticated,
    redirect: { name: 'HomePage' },
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '/home',
        name: 'HomePage',
        beforeEnter: forbidUnauthenticated,
        component: () => import('pages/IndexPage.vue'),
      },
      {
        path: '/profile',
        name: 'ProfilePage',
        beforeEnter: forbidUnauthenticated,
        component: () => import('pages/ProfilePage.vue'),
      },
      {
        path: '/gallery',
        name: 'GalleryPage',
        beforeEnter: forbidUnauthenticated,
        component: () => import('pages/GalleryPage.vue'),
      },
    ],
  },
  {
    path: '/auth',
    component: () => import('layouts/BlankLayout.vue'),
    children: [
      {
        path: 'login',
        name: 'LoginPage',
        beforeEnter: forbidAuthenticated,
        component: () => import('pages/LoginPage.vue'),
      },
      {
        path: 'register',
        name: 'RegisterPage',
        beforeEnter: forbidAuthenticated,
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },
  {
    path: '/:catchAll(.*)*',
    name: 'ErrorPage',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
