import { createRouter, createWebHistory } from 'vue-router';
import WorkTimeCalculator from '../components/WorkTimeCalculator.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: WorkTimeCalculator,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
