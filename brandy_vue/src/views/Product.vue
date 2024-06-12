<template>
    <div class="page-product">
        <div class="row">
            <div class="col-9">
                <figure class="image mb-6">
                    <img :src="product.get_thumbnail">

                </figure>
                <h1 class="title">{{ product.name}}</h1>
                <p>{{ product.description }}</p>

            </div>
            <div class="col-3">
                <h2 class="subtitle">Information</h2>
                <p><strong>Price :$</strong>{{ product.price }}</p>
                <div class="d-flex ">
                    <div class="control">
                        <input type="number" class="input" min="1" v-model=quantity>

                    </div>
                    <div class="control">
                        <a class="btn bg-dark text-light" @click="addToCart">Add to cart</a>

                    </div>

                </div>
            </div>
        </div>
        <Toast   position="top-left" />
    </div>

</template>
<script>
import App from '@/App.vue';
import axios from 'axios';
import Toast from 'primevue/toast';
import { useToast } from "primevue/usetoast";
export default {
    name: 'Product',
    
    data() {
        return {
            product:{},
            quantity:1
        }
    },
    mounted() {
        this.getProduct()
        
    },
    methods: {
        async getProduct() {
            this.$store.commit('setIsLoading',true)
            const category_slug = this.$route.params.category_slug
            const product_slug = this.$route.params.product_slug
           await axios.get(`/api/v1/product-details/${category_slug}/${product_slug}`).then(res => {
               this.product = res.data;
               document.title = this.product.name + ' | Brandy'
                
            }).catch(error => {
                console.log(error)
            })

            this.$store.commit('setIsLoading', false)
        },
        addToCart() {
            if (isNaN(this.quantity) || this.quantity < 1) {
                this.quantity = 1
            }
            const item = {
                product: this.product,
                quantity : this.quantity
            }
            this.$store.commit('addToCart', item)
            // const toast = useToast()
        // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Order submitted', life: 3000 });
        }
    }
}
</script>
<style scoped lang="scss">
.btn{
    border-radius: unset;
}
.control a, input{
    height: 60%;

}
</style>