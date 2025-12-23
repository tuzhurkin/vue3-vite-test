import MainPage from '@/views/index.vue';
import ProjectPage from '@/views/project/index.vue';
import InstructionsPage from '@/views/instructions/index.vue';
import NotFound from '@/views/notFound.vue';
import { createRouter, createWebHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    name: 'MainPage',
    component: MainPage,
    meta: {
      title: 'Main Page',
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/project',
    name: 'ProjectPage',
    component: ProjectPage,
    meta: {
      title: 'Project Page',
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/instructions',
    name: 'InstructionsPage',
    component: InstructionsPage,
    meta: {
      title: 'Instructions Page',
      layout: 'DefaultLayout',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    // meta: {
    //   layout: 'NotFoundLayout',
    // },
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
