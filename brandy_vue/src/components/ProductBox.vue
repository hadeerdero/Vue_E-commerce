<template>
    <div class="product-card">
        <div class="product-img">
            <img class="w-100" :src="product.get_thumbnail">
            <div class="overlay">
                <button class="btn-add-to-cart">
                    Add to Cart
                </button>
                <button class="view-details">
                    <router-link :to="product.get_absolute_url"> View Details</router-link>
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
    }
}
</script>