import { createStore } from 'vuex'

export default createStore({
  state: {
    cart:{
      items:[],
},
  isAuthenticated: false,
  isLoading: false,
  token:''
  },
  getters: {
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('cart')) {
        state.cart = JSON.parse(localStorage.getItem('cart'))
        
      } else {
        localStorage.setItem('cart',JSON.stringify(state.cart))
      }
    },
    addToCart(state, item) {
      let exist = null
      for (let i = 0; i < state.cart.items.length; i++) {
        if (state.cart.items[i]) {
          if (state.cart.items[i].product.id === item.product.id) {
            exist = state.cart.items[i]
          }
            
        }
      }
        if (exist) {
          exist.quantity = parseInt(exist.quantity) + parseInt(item.quantity)
        } else {
          
          state.cart.items.push(item)
        }
      localStorage.setItem('cart',JSON.stringify(state.cart))
    },
    setIsLoading(state,status) {
      state.isLoading = status
    }
  },
  actions: {
  },
  modules: {
  }
})
