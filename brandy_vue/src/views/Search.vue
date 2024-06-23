<template>
    <div class="page-search">
        <div class="row">
            <div class="col-12">
                <h1 class="title">
                    Search
                </h1>
                <h2 class="fs-5">Search term "{{query}}"</h2>

            </div>
            <div class="col-3" v-for="product in products" :key="product.id">
                <Product :product="product"></Product>
            </div>


        </div>
    </div>
</template>
<script>
import axios from 'axios';
import Product from '@/components/ProductBox'
export default{
    name:'Search',
    components:{
        Product
    },
    data(){
        return{
            products : [],
            query : ''
        }
    },
    mounted(){
        document.title = 'Search | Brandy'
        let url = window.location.search.substring(1)
        let params = new URLSearchParams(url)
        if(params.get('query')){
            this.query = params.get('query')
            this.performSearch()
        }
    },
    methods:{
        async performSearch(){
            this.$store.commit('setIsLoading', true) 
            await axios.post('api/v1/products/search',{'query':this.query}).then(res=>{
                this.products = res.data
            }).catch(error =>{
                console.log(error)
            })
            this.$store.commit('setIsLoading', false)
        }
    }
}
</script>