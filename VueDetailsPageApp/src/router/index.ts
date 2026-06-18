import { createRouter, createWebHistory } from 'vue-router'
import DetailsPage from '@/views/DetailsPage.vue'

export function createAppRouter(base = '/') {
  return createRouter({
    history: createWebHistory(base),
    routes: [
      {
        path: '/',
        redirect: '/details/1'
      },
      {
        path: '/details/:id',
        name: 'details',
        component: DetailsPage
      },
      {
        path: '/:pathMatch(.*)*',
        redirect: '/details/1'
      }
    ]
  })
}
