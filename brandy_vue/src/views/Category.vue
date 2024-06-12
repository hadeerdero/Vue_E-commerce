<template>
    <div class="page-category">
        <div v-for="product in category.products" :key="product.id">
            <Product :product="product"></Product>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Product from '@/components/ProductBox.vue'
export default {
    name: 'Category',
    components: {
        Product
    },
    date() {
        return {
            category: {
                products:[]
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug
            this.$store.commit('setIsLoading', true)
            console.log("this.category",res.data)
            await axios.get(`/api/v1/category-details/${categorySlug}`).then(res => {
                this.category = res.data;
                document.title = this.category.name + ' | Brandy'

            }).catch(error => {
                console.log(error)
            })
            this.$store.commit('setIsLoading', false)
        }
    }

}
</script>