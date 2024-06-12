<template>
  <div class="home">
   <section class="welcom-section d-flex justify-content-center p-5">
    <div>
      <p class="text-center h1 text-light ">
        <span class="auto-type"></span>
        
      </p>
      <p class="text-center text-light">
        The best clothes store online
      </p>
    </div>
   </section>
   <div>
    <div class="d-flex justify-content-center p-5">
      <h2>Latest products</h2>
    </div>
    <div class="wrapper">
    <div v-for="product in latestProducts" :key="product.id">
        <Product :product="product"></Product>
    </div>

    </div>
   </div>
  </div>
</template>


<script>
import Typed from 'typed.js';
// @ is an alias to /src
import axios from 'axios';
import Product from '@/components/ProductBox.vue'
import {api} from "@/plugins/axios/axios"
export default {
  name: 'HomeView',
  data(){
    return{
      latestProducts:[]
    }
  },
  components: {
    Product
  },
  // mounted(){
  //   this.getLatestProducts()
  // },
  created() {
  this.getLatestProducts();
},
mounted() {
  this.initializeTyped();
    document.title = 'Home | Brandy'
  },
  methods:{
    initializeTyped() {
      // const options = {
      //   strings: ['Welcom' ,'to' ,'Brandy'],
      //   typeSpeed: 50,
      //   loop: true,
      //   loopCount: Infinity
      // };
      // this.typed = new Typed(this.$refs.typed, options);
      this.typed = new Typed('.auto-type',{
        strings: ['Welcom to Brandy'],
        typeSpeed: 150,

      })
    },
  
  beforeDestroy() {
    if (this.typed) {
      this.typed.destroy();
    }
  },
//   async getLatestProducts() {
//   let response = () => {
//     return new Promise(function(resolve, reject) {
//       axios.get('http://127.0.0.1:8000/api/v1/latest-products' ).then(response => {
//         resolve(response);
//       });
//     });
//   };
//   let responseData = await response();
//   console.log(responseData.data);
//   this.latestProducts = responseData.data
// }
    // async getLatestProducts() {
    //   try {
    //     const response = await axios.get('/api/v1/latest-products/')
    //     console.log(response);
    //     return Promise.resolve(response.data)
    //   } catch (error) {
    //     console.log(error)
    //     return Promise.reject(error)
    //   }
     
    // },
    async getLatestProducts(){
      this.$store.commit('setIsLoading', true)
      await axios.get('/api/v1/latest-products/')
      .then(response =>{
        console.log(response)
        this.latestProducts = response.data.data
      })
      .catch(error =>{
        console.log(error)
      })
      this.$store.commit('setIsLoading', false)
    }
  }
}
</script>
<style lang="scss" scoped>
.welcom-section{
  margin:3rem ;
  height: 30vh;
 background-color: gray;
}
</style>@/plugins/axios/axios