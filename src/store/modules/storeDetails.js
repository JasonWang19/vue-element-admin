'use strict'

import { update, getStoreInfo } from '@/api/storeDetails'

const state = {
  allStores: [],
  currentStore: null
}

const getters = {
  details: state => {
    return state.allStores
  },
  currentStore: state => {
    return state.currentStore
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
  }
}

const actions = {
  changeCurrentStore({ commit }, data) {
    console.log('changeCurrentStore')
    commit('CHANGE_CURRENT_STORE', data)
  },

  updateStore({ commit, dispatch }, { mode, storeDetail }) {
    console.log('change Store: ', storeDetail, 'mode', mode)

    return new Promise((resolve, reject) => {
      update(storeDetail).then(response => {
        console.log('update store, get response: ', response)
        commit('UPDATE_STORE', response)
        dispatch(
          'user/linkStore',
          {
            shopId: response.id,
            shopType: 'restaurant'
          },
          { root: true }
        )
      }).catch(error => {
        reject(error)
      })
    })
  },

  getStoreInfo({ commit }, userShopRoles) {
    console.log('get all store info bases on ', userShopRoles)
    const allStorePromise = userShopRoles.map(r => getStoreInfo(r.shopId))
    // let allStorePromise = []
    Promise.all(allStorePromise).then(stores => {
      commit('SET_ALL_STORES', stores)
    })
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
