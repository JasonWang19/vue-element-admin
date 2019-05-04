'use strict'

import { create, update, getStoreInfo, getStoreUsers } from '@/api/storeDetails'
import { SHOP_TYPE, SHOP_ROLES } from '@/utils/constants'

const initialState = {
  allStores: [],
  currentStore: null,
  storeUsers: {}
}

const state = Object.assign({}, initialState)

const getters = {
  details: state => {
    return state.allStores
  },
  currentStore: state => {
    return state.currentStore
  },
  currentStoreUsers: state => {
    if (state.currentStore !== null) {
      const id = state.currentStore.id
      if (state.storeUsers.hasOwnProperty(id)) { return state.storeUsers[id] }
    }
    return []
  }
}
const mutations = {
  CHANGE_CURRENT_STORE: (state, id) => {
    state.currentStore = state.allStores.filter(s => s.id === id)[0]
  },
  UPDATE_STORE: (state, detail) => {
    // TODO: temporary solution
    // remove temporary solution
    // detail.id = detail.id !== '' ? detail.id : new Date().getTime()

    state.allStores = state.allStores.filter(s => s.id !== detail.id)
    state.allStores.push(detail)
    state.currentStore = detail
    console.log('new stores', state.allStores)
  },
  SET_ALL_STORES: (state, stores) => {
    console.log('set all stores', stores)
    state.allStores = stores
    if (state.currentStore === null && stores !== null && stores.length > 0) state.currentStore = state.allStores[0]
  },
  SET_STORE_USERS: (state, { storeId, shopUsers }) => {
    console.log('set store users', storeId, shopUsers, state.allStores)
    state.storeUsers[storeId] = shopUsers
    console.log('after set store users', state.storeUsers)
  },
  RESET: (state) => {
    for (const key of Object.keys(initialState)) {
      state[key] = initialState[key]
    }
  }
}

const actions = {
  changeCurrentStore({ commit, state, dispatch }, data) {
    console.log('changeCurrentStore')
    commit('CHANGE_CURRENT_STORE', data)
  },

  createStore({ commit, dispatch }, { mode, storeDetail }) {
    console.log('create Store: ', storeDetail, 'mode', mode)

    return new Promise((resolve, reject) => {
      create(storeDetail).then(response => {
        console.log('create store, get response: ', response)
        commit('UPDATE_STORE', response)
        dispatch(
          'user/linkStore',
          {
            shopId: response.id,
            shopType: 'restaurant'
          },
          { root: true }
        )
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  updateStore({ commit, dispatch }, { mode, storeDetail }) {
    console.log('update Store: ', storeDetail, 'mode', mode)

    return new Promise((resolve, reject) => {
      update(storeDetail).then(response => {
        console.log('update store, get response: ', response)
        commit('UPDATE_STORE', response)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  getStoreInfo({ commit, dispatch }, userShopRoles) {
    console.log('get all store info bases on ', userShopRoles)
    const allStorePromise = userShopRoles.map(r => getStoreInfo(r.shopId))
    // let allStorePromise = []
    Promise.all(allStorePromise).then(stores => {
      commit('SET_ALL_STORES', stores)
      // stores.forEach(s => {
      //   dispatch('getStoreUsers', s.id)
      // })
    })
  },

  getStoreUsers({ commit }, userShopRoles) {
    console.log('get all store users bases on ', userShopRoles)
    userShopRoles
      .filter(r => r.shopRoles.includes(SHOP_ROLES['admin'].value) || r.shopRoles.includes(SHOP_ROLES['owner'].value))
      // .map(r => {
      //   console.log('store with admin', r, r.shopId, r.shopRoles.includes(SHOP_ROLES['admin'].value) || r.shopRoles.includes(SHOP_ROLES['owner'].value));
      //   return
      // })
      .map(r => new Promise((resolve, reject) => {
        getStoreUsers(SHOP_TYPE.RESTAURANT, r.shopId).then(response => {
          console.log('update store users, get response: ', response)
          commit('SET_STORE_USERS', { storeId: r.shopId, shopUsers: response })
          resolve()
        })
      }))
  }

  // addNewStore({ commit }) {
  //   console.log('addNewStore')
  //   commit('ADD_NEW_STORE')
  // }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
