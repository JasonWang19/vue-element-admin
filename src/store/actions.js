'use strict'
import { removeToken } from '@/utils/auth'
import { resetRouter } from '@/router'

const actions = {
  reset({ commit }) {
    return new Promise((resolve, reject) => {
      commit('permission/RESET')
      commit('product/RESET')
      commit('tageView/RESET')
      commit('tageView/RESET')
      commit('storeDetails/RESET')
      commit('user/SET_TOKEN', '')
      commit('user/SET_ROLES', [])
      removeToken()
      resetRouter()
      resolve()
    })
  }
}
export default actions
