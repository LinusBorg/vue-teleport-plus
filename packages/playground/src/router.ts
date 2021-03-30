import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SingleTeleport from './views/SingleTeleport.vue'
import MultipleSources from './views/MultipleSources.vue'
import CustomOutlet from './views/CustomOutlet.vue'
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
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
