<template>
  <div class="home">
   <section class="welcom-section d-flex justify-content-center p-5">
    <div>
      <p class="text-center h1 text-light">
        Welcom to Brandy
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
    <div v-for="product in latestProducts" :key="product.id">
      <div class="row products">
        <div class="col-4 product-card">

          <h3>{{product.name}}</h3>
          <figure class="product-image">
            <img :src="product.get_thumbnail">
          </figure>
          <p>${{product.price}}</p>
        </div>
      </div>

    </div>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
import {api} from "@/plugins/axios/axios"
export default {
  name: 'HomeView',
  data(){
    return{
      latestProducts:[]
    }
  },
  components: {
  },
  // mounted(){
  //   this.getLatestProducts()
  // },
  created() {
  this.getLatestProducts();
},
  methods:{
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
    getLatestProducts(){
     
      axios.get('/api/v1/latest-products/')
      .then(response =>{
        console.log(response)
        this.latestProducts = response.data.data
      })
      .catch(error =>{
        console.log(error)
      })
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