import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/base/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('@/views/home.vue')
        }
      ]
    }
  ]
})

export default router
