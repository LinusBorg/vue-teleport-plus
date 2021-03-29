import { h } from '@vue/runtime-core'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import SingleTeleport from './views/SingleTeleport.vue'

export const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    meta: {
      title: 'Home',
    },
    component: {
      render: () => h('div'),
    },
  },
  {
    path: '/single',
    name: 'single',
    meta: {
      title: 'Single Teleport',
    },
    component: SingleTeleport,
  },
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
})
