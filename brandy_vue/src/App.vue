<template>
  <div class="main-div" :style="{height:'100px;'}">
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container">
        <a class="navbar-brand" href="/"><strong>Brandy</strong></a>
        <form class="my-2 my-lg-0" method="get" action="/search">
          <div class="search-wrapper">
            <input class="form-control mr-sm-2" type="search" placeholder="What are you looking for?" aria-label="Search" name="query">
            <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
        </div>
        </form>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#main"
          aria-controls="main" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          <!-- <span><i class="fa-solid fa-bars"></i></span> -->
        </button>
        <div class="collapse navbar-collapse" id="main">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">

              <router-link to="/summer" class="nav-link p-lg-2">Summer</router-link>


              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            </li>
            <li class="nav-item">
              <router-link to="/winter" class="nav-link p-lg-2">Winter</router-link>
            </li>

            <li class="nav-item login-btn" v-if="$store.state.isAuthenticated">
              <router-link to="/my-account" class="btn btn-light  p-lg-2 me-2">My account</router-link>
            </li>
            <li class="nav-item login-btn" v-else>
              <router-link to="/log-in" class="btn btn-light  p-lg-2 me-2">Log in</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/cart" class="btn btn-success p-lg-2 ">
                <span class="icon"> <i class="fas fa-shopping-cart"></i></span>
                <span>Cart({{ cartTotalLength }})</span>
              </router-link>
            </li>
          </ul>
          <!-- <form class="d-flex">
            <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
            <button class="btn btn-outline-success" type="submit">Search</button>
          </form> -->
        </div>
      </div>
    </nav>
    <div class="is-loading-bar text-center" :class="{ 'is-loading': $store.state.isLoading }">
      <div class="lds-dual-ring">

      </div>

    </div>
    <section class="section">
      <router-view />
    </section>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <footer class="bg-body-tertiary text-center text-lg-start mt-auto">
  <!-- Copyright -->
  <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
    © 2020 Copyright:
    <a class="text-body" href="https://mdbootstrap.com/">MDBootstrap.com</a>
  </div>
  <!-- Copyright -->
</footer>
  </div>

</template>
<script>
import axios from 'axios';

export default {
  data() {
    return {
      showMobileMenu: false,
      cart: {
        items: []
      }
    }
  },

  beforeCreate() {
    this.$store.commit('initializeStore')
    const token = this.$store.state.token
    if(token){
      axios.defaults.headers.common['Authorization'] = "Token " + token
    }else{
      axios.defaults.headers.common['Authorization'] = ""
    }
  },
  mounted() {
    this.cart = this.$store.state.cart
  },
computed: {
    cartTotalLength() {
    let totalLength = 0;
    console.log("this.cart.items.length",this.cart.items.length)
    for (let i = 0; i < this.cart.items.length; i++){
      if (this.cart.items[i]) {
        
        totalLength += this.cart.items[i].quantity
      }
    }
      return totalLength
    }

  },
}
</script>
<style lang="scss">
.lds-dual-ring{
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after{
content: '';
display: block;
width: 64px;
height: 64px;
margin: 8px;
border-radius: 50%;
border:6px solid #ccc;
border-color: #ccc transparent #ccc transparent;
animation: lds-dual-ring 1.2s linear infinite;


}
@keyframes lds-dual-ring {
  0%{
    transform: rotate(0deg);
  }
  100%{
    transform: rotate(360deg);
  }
}
.is-loading-bar{
  height: 0;
  overflow: hidden;
  -webkit-transition: all 0.3s;
  transition: all 0.3s;

  &.is-loading{
height: 80px;
  }
}
</style>
