<template>
<div class="page-cart">
    <div class="row m-0">
        <div class="col-12">
            <h1 class="title">
                Cart
            </h1>
            <CartItem></CartItem>
            <table class="table table-shadow" v-if="cartTotalLength">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Price</th>
                    <th scope="col">quantity</th>
                    <th scope="col">Total</th>
                    <th scope="col">control</th>
                  </tr>
                </thead>
                <tbody>
                    <tr v-for="item in cart.items" 
                    :key="item.product.id">
                        <td>
                            <RouterLink :to="item.product.get_absolute_url">{{item.product.name}}</RouterLink>
                        </td>
                        <td>{{item.product.price}}</td>
                        <td>{{item.quantity}}</td>
                        <td>${{getItemTotal(item).toFixed(2)}}</td>
                        <td><button  type="button" class="btn btn-danger text-decoration-none">Delete</button></td>
                    </tr>
                </tbody>
            </table>
            <p v-else>You don't have any products in your cart...</p>
        </div>
        <div class="col-12">
            <div class="card w-100 table-shadow custome-card" style="width: 18rem;">
                <div class="card-body">
                  <h5 class="card-title">Summary</h5>
                  <p class="card-text"> <strong>${{cartTotalPrice.toFixed(2)}}</strong>,{{ cartTotalLength }} items </p>
                  <router-link to="/cart/checkout" class="btn btn-dark ">Process to checkout</router-link>
                </div>
              </div>
            <!-- <h2>Summary</h2>
            <strong>${{cartTotalPrice.toFixed(2)}}</strong>,{{ cartTotalLength }} items
            <hr>
            <router-link to="/cart/checkout" clas="btn btn-dark">Process to checkout</router-link> -->
        </div>

    </div>
</div>

</template>
<script>
import axios from 'axios';
// import CartItem from '@/components/CartItem'
export default {
    name:'Cart',
    component :{
        // CartItem
    },
    data(){
        return{
            cart:{
                items : []
            }
        }
    },
    mounted(){
        this.cart.items = this.$store.state.cart.items
        console.log("cart",this.cart.items)
    },
    computed:{
        cartTotalLength(){
            return this.cart.items.reduce((acc, curVal) =>{
                return acc += curVal.quantity
            },0)
        },
        cartTotalPrice(){
            return this.cart.items.reduce((acc, curVal)=>{
                return acc += curVal.product.price * curVal.quantity
            },0)
        }
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.product.price
        }
    }
}
</script>