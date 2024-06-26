<template>
    <div class="p-2 mb-5 table-shadow">
        <div class="card-body">
    <h3 class="col-4 mb-5">Order #{{order.id}}</h3>
    <h4 class="col-5">Products</h4>
    <table class="table table-shadow">
        <thead>
          <tr>
            <th scope="col">Product</th>
            <th scope="col">Price</th>
            <th scope="col">quantity</th>
            <th scope="col">Total</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in order.items" :key="item.product.id">
            <td>
             
                {{item.product.name}}
             
            </td>
            <td>{{ item.product.price }}</td>
            <td>
              {{ item.quantity }}
             
            </td>
            <td>${{ getItemTotal(item).toFixed(2) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
</div>
</template>
<script>
export default{
    name:'OrderSummary',
    props:{
        order:Object
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.price
        },
        orderTotalLength(order){
            return order.items.reduce((acc,curVal)=>{
                return acc +=curVal.quantity
            },0)
        }
    }
}
</script>
