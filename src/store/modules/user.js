'use strict'

// import { login, logout, getInfo } from '@/api/user'
import { login, getInfo, linkStore } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  // avatar: '',
  // introduction: '',
  roles: [],
  details: null,
  currentRoles: ['default']
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_USER_NAME: (state, username) => {
    state.username = username
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_USER_DETAILS: (state, details) => {
    state.details = details
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    console.log('setting the roles: ', roles)
    state.roles = roles
  },
  UPDATE_ROLE: (state, role) => {
    state.details.userShopRoles = state.details.userShopRoles.filter(r => r.shopId !== role.shopId)
    state.details.userShopRoles.push(role)
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log('get response: ', response)
        commit('SET_TOKEN', response.access_token)
        setToken(response.access_token)
        commit('SET_USER_NAME', username)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      getInfo({
        token: state.token,
        username: state.username
      })
        .then(data => {
          // data is used here since the response is intercepted in request.js

          console.log('get info: ', data)

          if (!data) {
            reject('Verification failed, please Login again.')
          }

          const { userShopRoles, lastName, firstName } = data
          // const { lastName, firstName } = data

          // roles must be a non-empty array
          // if (!roles || roles.length <= 0) {
          //   reject('getInfo: roles must be a non-null array!')
          // }

          // TODO: temporarily hard code
          // commit('SET_ROLES', userShopRoles)
          commit('SET_ROLES', userShopRoles)
          commit('SET_NAME', `${firstName} ${lastName}`)
          commit('SET_USER_DETAILS', data)
          // commit('SET_AVATAR', avatar)
          // commit('SET_INTRODUCTION', introduction)

          // trigger the update of the stores linked with user
          console.log('before dispatch to getStoreInfo', data.userShopRoles)
          dispatch('storeDetails/getStoreInfo', data.userShopRoles, { root: true })
          dispatch('product/fetchMenu', data.userShopRoles, { root: true })
          resolve(data)
        }).catch(error => {
          reject(error)
        })
    })
  },

  // user logout
  logout({ commit, state }) {
    return new Promise((resolve, reject) => {
      // logout(state.token).then(() => {
      //   commit('SET_TOKEN', '')
      //   commit('SET_ROLES', [])
      //   removeToken()
      //   resetRouter()
      //   resolve()
      // }).catch(error => {
      //   reject(error)
      // })
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  },

  // remove token
  resetToken({ commit }) {
    console.log('in reset token')
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // Dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      resolve()
    })
  },

  linkStore({ commit, state }, { shopId, shopType }) {
    return new Promise((resolve, reject) => {
      linkStore({
        username: state.details.username,
        shopType,
        shopId
      }).then(data => {
        console.log('link store get resp: ', data)
        commit('UPDATE_ROLE', data)
      }).catch(err => {
        reject('Cannot link store with user', err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
