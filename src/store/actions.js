'use strict'
import { removeAuth } from '@/utils/auth'
import { resetRouter } from '@/router'

const actions = {
  reset({ commit }) {
    return new Promise((resolve, reject) => {
      commit('permission/RESET')
      commit('product/RESET')
      commit('tagView/RESET')
      commit('storeDetails/RESET')
      removeAuth()
      commit('user/RESET')
      resetRouter()
      resolve()
    })
  }
}
export default actions
