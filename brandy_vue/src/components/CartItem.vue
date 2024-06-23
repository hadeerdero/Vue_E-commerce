<template>
    <tr>
        <td>
            <RouterLink :to="item.product.get_absolute_url">{{item.product.name}}</RouterLink>
        </td>
        <td>{{item.product.price}}</td>
        <td>{{item.quantity}}
            <a @click="decrementQuantity(item)">-</a>
            <a @click="increamentQuantity(item)">+</a>
        </td>
        <td>${{getItemTotal(item).toFixed(2)}}</td>
        <td><button  type="button" class="btn btn-danger text-decoration-none" @click="removeFromCart(item)">Delete</button></td>
    </tr>
<!-- <tr>
    <td>
        <RouterLink :to="item.product.get_absolute_url">{{item.product.name}}</RouterLink>
    </td>
    <td>{{item.quantity}}</td>
    <td>${{getItemTotal(item).toFixed(2)}}</td>
    <td><button  type="button" class="btn btn-danger"></button></td>
</tr> -->
</template>
<script>
export default {
    name:'CartItem',
    props:{
        initialItem: Object
    },
    data(){
        return{
            item : this.initialItem
        }
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.price
        }
    },
    decrementQuantity(item){
        item.quantity -=1
        if(item.quantity === 0 ){
            this.$emit('removeFromCart',item)
        }
        this.updateCart()

    },
increamentQuantity(item){
    item.quantity +=1
    this.updateCart()
},
updateCart(){
    localStorage.setItem('cart',JSON.stringify(this.$store.state.cart))
},removeFromCart(item){
    this.$emit('removeFromCart',item)
    this.updateCart()
}
}
</script>