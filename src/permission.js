import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/signup', '/auth-redirect'] // no redirect whitelist

router.beforeEach(async(to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const hasToken = getToken()

  console.log('in permission, token is: ', hasToken)
  if (hasToken) {
    if (to.path === '/login') {
      // if is logged in, redirect to the home page
      next({ path: '/' })
      NProgress.done()
    } else {
      // determine whether the user has obtained his permission roles through getInfo

      const hasRoles = store.getters.roles !== null
      console.log('in permission to check current role: ', store.getters.roles, '  hasRoles: ', hasRoles)
      // const hasRoles = store.getters.roles
      if (hasRoles) {
        next()
      } else {
        try {
          // TODO: fix this part, need to avoid using this since no user information passed in

          // get user info
          // note: roles must be a object array! such as: ['admin'] or ,['developer','editor']
          const data = await store.dispatch('user/getInfo')

          console.log('in permission to generate path, roles: ', data, store.getters.roles)

          // generate accessible routes map based on roles
          const accessRoutes = await store.dispatch('permission/generateRoutes', store.getters.roles)
          console.log('access routes: ', accessRoutes)
          // dynamically add accessible routes
          router.addRoutes(accessRoutes)

          // hack method to ensure that addRoutes is complete
          // set the replace: true, so the navigation will not leave a history record
          next({ ...to, replace: true })
        } catch (error) {
          console.log('in permission, error: ', error)
          // remove token and go to login page to re-login
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
          NProgress.done()
        }
      }
    }
  } else {
    /* has no token*/

    if (whiteList.indexOf(to.path) !== -1) {
      // in the free login whitelist, go directly
      next()
    } else {
      // other pages that do not have permission to access are redirected to the login page.
      next(`/login?redirect=${to.path}`)
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})
