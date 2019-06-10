import Vue from 'vue'
import Router from 'vue-router'

import First from '@/views/layout/First.vue'

Vue.use(Router)
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/',
    component: First,
    redirect: 'dashboard',
    hidden: false,
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  {
    path: '/home',
    component: First,
    children: [{
      path: 'index',
      name: 'Home',
      component: () => import('@/views/home/index.vue'),
      meta: {
        title: '表单',
        icon: 'form'
      }
    }]
  },
  {
    path: '/about',
    component: First,
    children: [{
      path: 'index',
      name: 'About',
      component: () => import('@/views/about/index.vue'),
      meta: {
        title: '关于',
        icon: 'form'
      }
    }]
  },
  {
    path: '/example',
    component: First,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'example' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
  {
    path: '/system',
    component: First,
    redirect: '/system/user',
    name: 'System',
    meta: { title: '系统设置', icon: 'example' },
    children: [
      {
        path: 'user',
        name: 'User',
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },
]
export const asyncRoutes = []
export default new Router({
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRoutes
})