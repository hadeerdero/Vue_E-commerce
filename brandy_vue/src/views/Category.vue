<template>
    <div class="page-category">
        <div class="row m-5">
            <div class="col-12">
                <h2 class="">{{ category.name }}</h2>
            </div>
           
            <div class="col-lg-3 col-md-6 col-sm-12" v-for="product in category.products" :key="product.id">
                <Product :product="product" @addToCart="addToCart"></Product>
        </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

import Product from '@/components/ProductBox'

export default {
    name: 'Category',
    components: {
        Product
    },
    data() {
        return {
            category: {
                products: []
            }
        }
    },
    mounted() {
        this.getCategory()
    },
    watch: {
        $route(to, from) {
            if (to.name === 'Category') {
                this.getCategory()
            }
        }
    },
    methods: {
        async getCategory() {
            const categorySlug = this.$route.params.category_slug

            this.$store.commit('setIsLoading', true)

            axios
                .get(`/api/v1/category-details/${categorySlug}`)
                .then(response => {
                    this.category = response.data

                    document.title = this.category.name + ' | Djackets'
                })
                .catch(error => {
                    console.log(error)

                 
                })

            this.$store.commit('setIsLoading', false)
        },
        addToCart(product) {
            const item = {
                product: product,
                quantity : 1
            }
            this.$store.commit('addToCart', item)
            // const toast = useToast()
        // toast.add({ severity: 'success', summary: 'Success Message', detail: 'Order submitted', life: 3000 });
        }
    }
}
</script>







<!-- <template>
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
</script> -->