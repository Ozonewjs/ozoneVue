import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'
import UserInfo from '@/views/system/userinfo'
import TeamInfo from '@/views/system/teaminfo'
import RoleInfo from '@/views/system/roleinfo'
import MyDaily from '@/views/daily/mydaily'
import WorkList from '@/views/daily/workList'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * 编写路由 router 和路由对应的 view component 的时候一定要确保 两者的 name 是完全一致
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'home', affix: true }
    }]
  }, 
  {
    path: '/test',
    hidden: true,
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'test1',
      name: 'todolist',
      component: () => import('@/views/form/index'),
      // meta: { title: '测试', icon: 'home', affix: false }
      meta: {  icon: '', affix: false }
    }]
  }, 
  {
    path: '/pdf/download',
    name: 'pdfdownload',
    component: () => import('@/components/pdf/download'),
    hidden: true
  },
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  {
    path: '/system',
    component: Layout,
    redirect: '/system/info',
    name: 'system',
    meta: {
    title: '系统设置', icon: 'system'},
    children: [
      {
        path: 'info',
        component: UserInfo, // Parent router-view
        name: 'UserInfo',
        meta: { title: '用户管理'},
      },
      {
        path: 'team',
        component: TeamInfo,
        name: 'TeamInfo',
        meta: { title: '团队管理'}
      },
      {
        path: 'role',
        component: RoleInfo,
        name: 'RoleInfo',
        meta: { title: '角色管理'}
      }
    ]
  },
  {
    path: '/daily',
    component: Layout,
    redirect: '/daily/mydaily',
    name: 'daily',
    meta: {title: '日常管理', icon: 'system'},
    children: [
      {
        path: 'mydaily',
        component: MyDaily, // Parent router-view
        name: 'mydaily',
        meta: { title: '我的工作日清'},
      },
      {
        path: 'worklist',
        component: WorkList, // Parent router-view
        name: 'worklist',
        meta: { title: '工作计划'},
      },
    ]
  },
  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  // scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
