<template>
    <div class="product-card" style="width: 10rem;">
        <div class="row product-img">
            <img class="card-img-top custom-product-image" :src="product.get_thumbnail">
            <div class="overlay">
                <button class="btn-add-to-cart" @click="addToCart">
                    Add to Cart
                </button>
                <button class="view-details">
                    <router-link class="text-decoration-none text-dark" :to="product.get_absolute_url"> View Details</router-link>
                </button>
            </div>
        </div>
        <div class="info">
            <h3>{{ product.name }}</h3>
            <p class="price">${{ product.price }}</p>
            <p>{{ product.description }}</p>
        </div>


    </div>

</template>
<script>
export default {
    name: 'ProductBox',
    props: {
        product:Object
    },methods:{
        addToCart() {
            console.log("productBox",this.product)
           this.$emit('addToCart',this.product)
        }
    }
}
</script>