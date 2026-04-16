import { createRouter, createWebHistory } from 'vue-router'
import LandingView from '../views/LandingView.vue'
import Authentication from '../views/Authentication.vue'
import PlanView from '../views/PlanView.vue'
import TripsView from '../views/TripsView.vue'
import ProfileView from '../views/ProfileView.vue'
import SubscriptionView from '../views/SubscriptionView.vue'
import UserReviews from '@/views/UserReviews.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { 
      path: '/', 
      name: 'Landing', 
      component: LandingView 
    },
    { 
      path: '/login', 
      name: 'Login', 
      component: Authentication 
    },
    { 
      path: '/plan', 
      name: 'Plan', 
      component: PlanView,
      meta: { requiresAuth: true }
    },
    {
      path: '/reviews',
      name: 'Reviews',
      component: UserReviews,
      meta: { requiresAuth: true }
    },
    { 
      path: '/trips', 
      name: 'Trips', 
      component: TripsView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/profile', 
      name: 'Profile', 
      component: ProfileView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/subscription', 
      name: 'Subscription', 
      component: SubscriptionView,
      meta: { requiresAuth: true }
    },
    { 
      path: '/groups', 
      name: 'Groups', 
      component: () => import('@/views/GroupsView.vue'),
      meta: { requiresAuth: true }
    },
    { 
      path: '/groups/:id', 
      name: 'GroupDetails', 
      component: () => import('@/views/GroupDetailsView.vue'),
      meta: { requiresAuth: true }
    },
    { 
      path: '/trip_details', 
      name: 'TripDetails',
      component: () => import('@/views/TripDetailsView.vue'),
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = !!localStorage.getItem('access_token')

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else if (to.path === '/login' && isAuthenticated) {
    next('/plan')
  } else {
    next()
  }
})

export default router