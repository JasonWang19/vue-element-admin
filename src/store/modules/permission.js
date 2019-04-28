import { asyncRoutes, constantRoutes } from '@/router'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param roles
 * @param route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return false
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes(routes, roles) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })

  return res
}

const initialState = {
  routes: [],
  addRoutes: []
}

const state = Object.assign({}, initialState)

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  },
  RESET: (state) => {
    const keys = Object.keys(state)
    for (const key of keys) {
      state[key] = initialState[key]
    }
  }
}

const actions = {
  generateRoutes({ commit, rootGetters }, roles) {
    return new Promise(resolve => {
      console.log('generate routes: ', rootGetters.currentRole)
      let accessedRoutes
      if (roles.includes('system_admin')) {
        accessedRoutes = asyncRoutes
      } else {
        accessedRoutes = filterAsyncRoutes(asyncRoutes, rootGetters.currentRole ? rootGetters.currentRole.shopRoles : ['default'])
      }
      // TODO: temporarily manually allow all

      // const accessedRoutes = asyncRoutes
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
