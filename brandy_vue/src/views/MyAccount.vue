<template>
    <div class="page-my-accountp">
        <div class="row m-2">
            <div class="col-12 mb-3"><h1>My Account</h1> </div>
            <div class="col-12 mb-3">
                <button class="btn btn-danger" @click="logout()">Log out</button>
            </div>
            <div class="col-12">
              <h2 class="subtitle">My orders</h2>
              <OrderSummary
              v-for="order in orders"
              :key="order.id"
              :order="order"
              >

              </OrderSummary>
            </div>
         
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import InputText from 'primevue/inputtext'
import OrderSummary from "@/components/OrderSummary.vue"
export default {
    name:'MyAccount',
    components:{
      OrderSummary,
    },
    data(){
        return{
            orders:[],
            username:'',
            password:'',
            errors : []

        }
    },
    computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
  },
    mounted(){
        document.title = "My account | Brandy"
        this.getOrders()
    },
    methods:{
     logout(){

        axios.defaults.headers.common['Authorization'] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        this.$store.commit('removeToken')
        this.$router.push('/')
     },
     async getOrders(){
      this.$store.commit('setIsLoading',true)
      await axios.get('/api/v1/orders/')
      .then(res=>{
        this.orders = res.data
      }).catch(error=>{
        console.log(error)
      })
      this.$store.commit('setIsLoading',false)
    }
    },
   
   
}
</script>