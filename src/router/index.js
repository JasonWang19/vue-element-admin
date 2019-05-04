import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
// import componentsRouter from './modules/components'
// import chartsRouter from './modules/charts'
// import tableRouter from './modules/table'
// import nestedRouter from './modules/nested'
import productRouter from './modules/product'

/** note: sub-menu only appear when children.length>=1
 *  detail see  https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 **/

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    roles: ['admin','editor']    will control the page roles (you can set multiple roles)
    title: 'title'               the name show in sub-menu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    noCache: true                if true, the page will no be cached(default is false)
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
    affix: true                  if true, the tag will affix in the tags-view
  }
**/

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 * */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/signup',
    component: () => import('@/views/signup/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/authredirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  },
  // {
  //   path: '',
  //   component: Layout,
  //   redirect: 'currentOrder',
  //   children: [
  //     {
  //       path: 'currentOrder',
  //       component: () => import('@/views/currentOrder/index'),
  //       name: 'CurrentOrder',
  //       meta: { title: 'currentOrder', icon: 'el-icon-success', noCache: true, affix: true }
  //     }
  //   ]
  // },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: 'dashboard', icon: 'dashboard', noCache: true, affix: true }
      }
    ]
  },
  // store management
  {
    path: '/store',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/store/index'),
        name: 'Store',
        meta: { title: 'store', icon: 'store', noCache: true }
      }
    ]
  }
  // {
  //   path: '/documentation',
  //   component: Layout,
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/documentation/index'),
  //       name: 'Documentation',
  //       meta: { title: 'documentation', icon: 'documentation', affix: true }
  //     }
  //   ]
  // },
  // {
  //   path: '/guide',
  //   component: Layout,
  //   redirect: '/guide/index',
  //   children: [
  //     {
  //       path: 'index',
  //       component: () => import('@/views/guide/index'),
  //       name: 'Guide',
  //       meta: { title: 'guide', icon: 'guide', noCache: true }
  //     }
  //   ]
  // }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
*/
export const asyncRoutes = [

  // product management
  productRouter,
  // user management
  {
    path: '/user',
    component: Layout,
    redirect: '/user/index',
    alwaysShow: true, // will always show the root menu
    meta: {
      title: 'user',
      icon: 'lock',
      roles: ['shop_owner', 'admin', 'default'] // you can set roles in root nav
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/user/page'),
        name: 'PagePermission',
        meta: {
          title: 'pagePermission',
          roles: ['shop_owner', 'admin', 'default'] // or you can only set roles in sub nav
        }
      },
      {
        path: 'assign',
        component: () => import('@/views/user/assign'),
        name: 'AssignPermission',
        meta: {
          title: 'assignPermission',
          // if do not set roles, means: this page does not require permission
          roles: ['shop_owner', 'admin', 'default']
        }
      },
      {
        path: 'role',
        component: () => import('@/views/user/role'),
        name: 'RolePermission',
        meta: {
          title: 'rolePermission',
          roles: ['shop_owner', 'admin', 'default']
        }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
