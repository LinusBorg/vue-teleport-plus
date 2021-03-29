import { h } from '@vue/runtime-core'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SingleTeleport from './views/SingleTeleport.vue'
import MultipleSources from './views/MultipleSources.vue'
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
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
