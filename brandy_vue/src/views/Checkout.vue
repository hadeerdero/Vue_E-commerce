<template>
<div class="checkout-page">
    <div class="row">
        <div class="col-12">
            <h1>Checkout Page</h1>
        </div>

    </div>
</div>

</template>
<script>
export default {
    name:'Checkout',
    data(){
        return{
            cart:{
                items:[]
            },
            stripe:{},
            card:{},
            first_name:"",
            last_name:"",
            email:"",
            phone:"",
            address:"",
            zipcode:"",
            place:"",
            errors:[]
                }
    },
    mounted(){
        document.title= "Checkout | Brandy"
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.product.price
        }
    }
}
</script>