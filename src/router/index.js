import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/campaign/Home.vue'

const routes = [
  {
    path: '/',
    component: Home
  },
  {
    path: '/AddCampaign/:eventId',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/campaign/AddCampaign.vue')
  },
  {
    path: '/AddCampaign',
    component: () => import('../views/campaign/AddCampaign.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
