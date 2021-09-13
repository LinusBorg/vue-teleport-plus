import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import SingleTeleport from './views/SingleTeleport.vue'
import MultipleSources from './views/MultipleSources.vue'
import CustomOutlet from './views/CustomOutlet.vue'
import Transition from './views/Transition.vue'
import Home from './views/Home.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'TeleportPlus Demos',
    },
    component: Home,
  },
  {
    path: '/single',
    name: 'single',
    meta: {
      title: 'Single Teleport',
    },
    component: SingleTeleport,
  },
  {
    path: '/multiple',
    name: 'multiple',
    meta: {
      title: 'Multiple Sources, one Outlet',
    },
    component: MultipleSources,
  },
  {
    path: '/custom-outlet',
    name: 'customOutlet',
    meta: {
      title: 'Customizing Outlet Elements',
    },
    component: CustomOutlet,
  },
  {
    path: '/transitions',
    name: 'transitions',
    component: Transition,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
