import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import errorLog from './modules/errorLog'
import permission from './modules/permission'
import tagsView from './modules/tagsView'
import settings from './modules/settings'
import user from './modules/user'
import storeDetails from './modules/storeDetails'
import product from './modules/product'
import getters from './getters'
import actions from './actions'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    errorLog,
    permission,
    tagsView,
    settings,
    user,
    storeDetails,
    product
  },
  getters,
  actions
})

export default store
