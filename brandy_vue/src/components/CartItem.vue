<template>
<tr>
    <td>
        <RouterLink :to="item.product.get_absolute_url">{{item.product.name}}</RouterLink>
    </td>
    <td>{{item.quantity}}</td>
    <td>${{getItemTotal(item).toFixed(2)}}</td>
    <td><button  type="button" class="btn btn-danger"></button></td>
</tr>
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
    }
}
</script>