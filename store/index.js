import Vue from 'vue'

export const state = () => ({
  products: []
})

export const actions = {
  async nuxtServerInit({ commit }) {
    const products = await Vue.prototype.$commerce.products.list()

    commit('setProducts', products.data)
  }
}

export const mutations = {
  setProducts(state, payload) {
    state.products = payload
  }
}

export const getters = {
  products(state) {
    return state.products
  }
}
