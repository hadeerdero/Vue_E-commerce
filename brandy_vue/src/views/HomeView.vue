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
      <div class="row">
        <figure>
          <img :src="product.get_thumbnail">
        </figure>
        <h3>{{product.name}}</h3>
        <p>${{product.price}}</p>
      </div>

    </div>
   </div>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from 'axios'
export default {
  name: 'HomeView',
  data(){
    return{
      latestProducts:[]
    }
  },
  components: {
  },
  mounted(){
    this.getLatestProducts()
  },
  methods:{
    async getLatestProducts(){
      await axios.get('/api/v1/latest-products/')
      .then(response =>{
        console.log(response)
        this.latestProducts = response.data
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
</style>