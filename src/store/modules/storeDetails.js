const state = {
  allStores: [
    // {
    //   id: 'id1',
    //   name: 'store name',
    //   license: 'license',
    //   displayName: 'branchName',
    //   storeType: 'single',
    //   description: 'desc',
    //   status:'normal',
    //   address: {
    //     address1: 'line1',
    //     address2: 'line2',
    //     district: 'district',
    //     city: 'city',
    //     state: 'state',
    //     country: 'country',
    //     zipcode: 'zipcode',
    //     nickname: 'nickname'
    //   },
    //   contact: {
    //     phoneNumber: 'phone',
    //     email: 'email',
    //     web: 'web',
    //     facebook: 'facebook',
    //     yelp: 'yelp',
    //     others: {}
    //   }
    // }
  ],
  currentStore: ''
}

const getters = {
  details: state => {
    return state.allStores
  },
  currentStore: state => {
    if (state.currentStore === '') {
      state.currentStore = state.allStores.length > 0 ? state.allStores[0] : null
    }
    return state.currentStore
  }
}
const mutations = {
  CHANGE_CURRENT_STORE: (state, id) => {
    state.currentStore = state.allStores.filter(s => s.id === id)[0]
  },
  UPDATE_STORE: (STATE, detail) => {
    // TODO: temporary solution
    detail.id = detail.id !== '' ? detail.id : new Date().getTime()
    state.allStores = state.allStores.filter(s => s.id !== detail.id)
    state.allStores.push(detail)
    console.log('new stores', state.allStores)
  },
  ADD_NEW_STORE: (state) => {
    console.log('mutation: add new store')
    const newStore = {
      id: '',
      name: 'New Store',
      license: '',
      displayName: '',
      storeType: '',
      description: '',
      address: {
        address1: '',
        address2: '',
        district: '',
        city: '',
        state: '',
        country: '',
        zipcode: '',
        nickname: ''
      },
      contact: {
        phoneNumber: '',
        email: '',
        web: '',
        facebook: '',
        yelp: '',
        others: {}
      }
    }
    state.allStores.push(newStore)
    state.currentStore = newStore.name
  }
}

const actions = {
  changeCurrentStore({ commit }, data) {
    console.log('changeCurrentStore')
    commit('CHANGE_CURRENT_STORE', data)
  },
  updateStore({ commit }, data) {
    console.log('changeCurrentStore', data)
    commit('UPDATE_STORE', data)
  },
  addNewStore({ commit }) {
    console.log('addNewStore')
    commit('ADD_NEW_STORE')
  }

}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
