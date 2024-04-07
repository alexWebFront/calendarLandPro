import { createRouter, createWebHistory } from 'vue-router';
import Wrapper from '@/views/Wrapper';

const routes = [
  {
    path: '/',
    name: 'main',
    component: Wrapper,
  },
  { path: '/:pathMatch(.*)*', name: 'underfund', component: Wrapper },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
