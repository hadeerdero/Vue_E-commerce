<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-light ">
      <div class="container">
        <a class="navbar-brand" href="#"><strong>Brandy</strong></a>
        <button class="navbar-toggler" type="button" 
        data-bs-toggle="collapse" 
        data-bs-target="#main" 
        aria-controls="main"
         aria-expanded="false"
         aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
          <!-- <span><i class="fa-solid fa-bars"></i></span> -->
        </button>
        <div class="collapse navbar-collapse" id="main">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0">
            <li class="nav-item">
             
                <router-link to="/" class="nav-link p-lg-2">Summer</router-link> 
                
             
              <!-- <a class="nav-link active" aria-current="page" href="#">Home</a> -->
            </li>
            <li class="nav-item">
              <router-link to="/" class="nav-link p-lg-2">Winter</router-link>
            </li>

            <li class="nav-item login-btn">
              <router-link to="/" class="btn btn-light  p-lg-2 me-2">Log in</router-link>
            </li>
            <li class="nav-item">
              <router-link to="/" class="btn btn-success p-lg-2 ">
                <span class="icon"> <i class="fas fa-shopping-cart"></i></span>
                <span>Cart</span>
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
    <section class="section">
      <router-view/>
    </section>
    <!-- <nav>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </nav> -->
    <footer class="footer">
      <p class="text-center">Copyright (c) 2024</p>
    </footer>
  </div>
  
</template>

<style lang="scss">



</style>
