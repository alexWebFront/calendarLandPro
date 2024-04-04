import { createRouter, createWebHistory } from 'vue-router';
import ScreenWrapper from '@/views/ScreenWrapper';

const routes = [
  {
    path: '/',
    name: 'main',
    component: ScreenWrapper,
  },
  { path: '/:pathMatch(.*)*', name: 'underfind', component: ScreenWrapper },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
