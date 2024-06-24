<template>
<div class="checkout-page">
    <div class="row m-2">
        <div class="col-12">
            <h1>Checkout Page</h1>
        </div>
        <div class="col-12">
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
                  <tr v-for="item in cart.items" :key="item.product.id">
                    <td>
                     
                       {{ item.product.name}}
                     
                    </td>
                    <td>{{ item.product.price }}</td>
                    <td>
                      {{ item.quantity }}
                    </td>
                    <td>${{ getItemTotal(item).toFixed(2) }}</td>
                    
                  </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">Total</td>
                        <td>{{cartTotalLength}}</td>
                        <td>${{cartTotalPrice}}</td>
                    </tr>
                </tfoot>
              </table>
        </div>
        <div class="col-12">
            <div class="card w-100 table-shadow custome-card p-2" style="width: 18rem">

                <h2 class="subtitle">Shipping details</h2>
                <p class="mb-4">* All fields are required</p>
                <div class="row">
                    <div class="col-6">
                        <div class="mb-3">
                            <label class="form-label">First name*</label>
                            <input v-model="first_name" class="form-control" type="text" placeholder="" aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Last name*</label>
                            <input v-model="last_name" class="form-control" type="text" placeholder="" aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Email*</label>
                            <input v-model="email" class="form-control" type="email" placeholder="" aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Phone*</label>
                            <input v-model="phone" class="form-control" type="text" placeholder="" aria-label="default input example">
                        </div>

                    </div>
                    <div class="col-6">
                        <div class="mb-3">
                            <label class="form-label">Address*</label>
                            <input v-model="address" class="form-control" type="text" placeholder="" aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Zip code*</label>
                            <input v-model="zipcode" class="form-control" type="text" placeholder="" aria-label="default input example">
                        </div>
                        <div class="mb-3">
                            <label class="form-label">Place*</label>
                            <input v-model="place" class="form-control" type="text" placeholder="" aria-label="default input example">
                        </div>
                    </div>
                    <div class="p-3 mb-3 bg-danger text-white" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{error}}</p>
                    </div>
                    <hr>
                    <div id="card-element" class="mb-5">

                    </div>
                    <template v-if="cartTotalLength">
                        <hr>
                        <button  class="btn btn-dark" @click="submitForm">Pay with stripe</button>

                    </template>
                </div>
            </div>

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
    computed: {
    cartTotalLength() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.quantity);
      }, 0);
    },
    cartTotalPrice() {
      return this.cart.items.reduce((acc, curVal) => {
        return (acc += curVal.product.price * curVal.quantity);
      }, 0);
    },
  },
    mounted(){
        document.title= "Checkout | Brandy"
        this.cart = this.$store.state.cart
    },
    methods:{
        getItemTotal(item){
            return item.quantity * item.product.price
        },
        submitForm(){
            this.errors = []
            if(this.first_name === ''){
                this.errors.push('The first name is missing')
            }
            if(this.last_name === ''){
                this.errors.push('The last name is missing')
            }
            if(this.email === ''){
                this.errors.push('The email is missing')
            }
            if(this.zipcode === ''){
                this.errors.push('The zipcode is missing')
            }
            if(this.phone === ''){
                this.errors.push('The phone is missing')
            }
            if(this.address === ''){
                this.errors.push('The address is missing')
            }
            if(this.place === ''){
                this.errors.push('The place is missing')
            }
            if(!this.errors.length){
                this.$store.commit("setIsLoading",true)
                this.stripe.createToken(this.card).then(result=>{
                    if(result.error){
                        this.$store.commit("setIsLoading",false)
                        this.errors.push('Something went wring with Stripe. Please try again')
                        console.log(result.error.message)
                    }else{
                        this.stripeTokenHandler(result.token)
                    }
                })
            }

        },
        async stripeTokenHandler(token){
            const items = []
            for(let i=0; i<this.cart.items.length ; i++){
                const item = this.cart.items[i]
                const obj = {
                    product: item.product.id,
                    quantity : item.quantity ,
                    price: item.product.price * item.quantity
                }
                items.push(obj)
            }
            const data = {
                "first_name" : this.first_name,
                "last_name" : this.last_name,
                "email" : this.email,
                "zipcode" : this.zipcode,
                "address" : this.address,
                "place" : this.place,
                "phone" : this.phone,
                "items" : items,
                "stripe_token":token.id
            }

        }
    }
}
</script>