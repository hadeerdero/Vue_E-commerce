<template>
    <div class="page-my-accountp">
        <div class="row m-2">
            <div class="col-12"><h1>My Account</h1> </div>
            <div class="col-12">
                <button class="btn btn-danger" @click="logout()">Log out</button>
            </div>
         
        </div>

    </div>
</template>
<script>
import axios from 'axios'
import InputText from 'primevue/inputtext'

export default {
    name:'MyAccount',
    data(){
        return{
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
        document.title = ""
    },
    methods:{
     logout(){

        axios.defaults.headers.common['Authorization'] = ""
        localStorage.removeItem("token")
        localStorage.removeItem("username")
        localStorage.removeItem("userid")
        this.$store.commit('removeToken')
        this.$router.push('/')
     }
    }
   
}
</script>