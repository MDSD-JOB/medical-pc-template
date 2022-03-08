// eslint-disable-next-line
import { UserLayout, BasicLayout } from '@/layouts'

const RouteView = {
  name: 'RouteView',
  render: (h) => h('router-view'),
}

export const asyncRouterMap = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    redirect: '/home',
    children: [
      {
        name: 'home',
        path: '/home',
        redirect: '/home/index',
        component: RouteView,
        hideChildrenInMenu: true,
        meta: {
          title: '首页',
          keepAlive: false,
          permission: 'admin',
          icon: 'icon_yujianfenzhen',
          permission: ['admin'],
        },
        children: [
          {
            name: 'homeIndex',
            path: '/home/index',
            component: () => import('@/views/home/index'),
            meta: { title: '首页', keepAlive: false, permission: ['admin'] },
          },
        ],
      },
    ],
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true,
  },
]

/**
 * 基础路由
 * @type { *[] }
 */
export const constantRouterMap = [
  {
    path: '/user',
    component: UserLayout,
    redirect: '/user/login',
    hidden: true,
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Login'),
      },
      {
        path: 'register',
        name: 'register',
        component: () => import(/* webpackChunkName: "user" */ '@/views/user/Register'),
      },
    ],
  },
  {
    name: '403',
    path: '/403',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/403'),
  },
  {
    path: '/404',
    component: () => import(/* webpackChunkName: "fail" */ '@/views/404'),
  },
]
