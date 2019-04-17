'use strict'

import { fetchMenu, updateMenu } from '@/api/product'

const state = {
  menus: []
}

const getters = {
}

const mutations = {
  SET_ALL_MENUS: (state, menus) => {
    console.log('set all menus', menus)
    state.menus = menus
  },
  UPDATE_MENU: (state, menu) => {
    console.log('update menu', menu, state.menus)
    const menus = state.menus.filter(m => m.restaurantId !== menu.restaurantId)
    menus.push(menu)
    state.menus = menus
  }
}

const actions = {
  fetchMenu({ commit }, userShopRoles) {
    console.log('get all store menu bases on ', userShopRoles)

    userShopRoles.forEach(r => new Promise((resolve, reject) => {
      fetchMenu(r.shopId).then(response => {
        console.log('fetch menu, get response: ', response)
        commit('UPDATE_MENU', response)
      }).catch(error => {
        // console.log(error)
        reject(error)
      })
    }))
    // let allStorePromise = userShopRoles.map(r => fetchMenu(r.shopId))
    // Promise.all(allStorePromise).then(menus => {
    //   commit('SET_ALL_MENUS', menus);
    // })
  },
  createDishCategory({ commit, rootState, rootGetters }, { category, dish }) {
    console.log('creating new dish', dish, 'category', category)
    let currentMenu = rootGetters.currentMenu
    console.log('creating new dish, currentMenu', currentMenu, rootState, rootGetters)
    if (!currentMenu) {
      currentMenu = {
        restaurantId: rootState.storeDetails.currentStore.id,
        categories: [],
        items: []
      }
    }
    if (category) {
      currentMenu.categories = currentMenu.categories.filter(c => c !== category)
      console.log('current menu categories', currentMenu.categories)
      currentMenu.categories.push(category)
    }
    if (dish) {
      currentMenu.items.push(dish)
    }

    return new Promise((resolve, reject) => {
      updateMenu(currentMenu).then(response => {
        console.log('update menu, get response: ', response)
        commit('UPDATE_MENU', currentMenu)
      }).catch(error => {
        reject(error)
      })
    })

    // createDish(dish).then(() => {
    //   this.list.unshift(this.temp);
    //   this.dialogFormVisible = false;
    //   this.$notify({
    //     title: "成功",
    //     message: "创建成功",
    //     type: "success",
    //     duration: 2000
    //   });
    // });
  },
  updateDishCategory({ commit, rootState, rootGetters }, { category, dish, exist }) {
    const currentMenu = rootGetters.currentMenu

    if (category) {
      currentMenu.categories = currentMenu.categories.map(c => c === exist ? category : c)
      console.log('update menu categories', currentMenu.categories)
    }
    if (dish) {
      currentMenu.items = currentMenu.items.map(i => i.name === exist.name ? dish : i)
    }

    return new Promise((resolve, reject) => {
      updateMenu(currentMenu).then(response => {
        console.log('update menu, get response: ', response)
        commit('UPDATE_MENU', currentMenu)
      }).catch(error => {
        reject(error)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
