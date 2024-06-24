<template>
    <div class="page-login">
        <div class="row">
            <div class="col-4 m-auto">
                <h1 class="title">Login</h1>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label class="form-label">username</label>
                        <input v-model="username" class="form-control" type="text" placeholder="Username" aria-label="default input example">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input v-model="password" class="form-control" type="password" placeholder="" aria-label="default input example">
                      </div>
                    
                      <div class="p-3 mb-2 bg-danger text-white" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{error}}</p>
                      </div>
                      <div class="mb-3">
                       <div>
                        <button class="btn btn-dark ">Login</button>
                      </div>
                      </div>
                      <hr>
                      or  <router-link to="/sign-up">click here</router-link> to sing up!
                </form>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios'

export default {
    name:'Login',
    data(){
        return{
            username:'',
            password:'',
            errors : []

        }
    },
    mounted(){
        document.title = "Brandy | Login"
    },
    methods:{
       async submitForm(){
             axios.defaults.headers.common['Authorization'] = ""
            localStorage.removeItem('token')
            this.errors = []
            if(this.username === ''){
                this.errors.push('The username is missing')
            }
            if(this.password === ''){
                this.errors.push('The password is missing')
            }
           
            if(!this.errors.length){
                const formData = {
                    username : this.username,
                    password : this.password
                }
                await axios.post("/api/v1/token/login",formData)
                .then(res=>{
                    const token = res.data.auth_token
                    this.$store.commit('setToken',token)
                    axios.defaults.headers.common['Authorization'] = "Token " + token
                    localStorage.setItem('token',token)
                    const setPath = this.$route.query.to || '/cart'
                    this.$router.push(setPath)
                })
                .catch(error=>{
                    console.log("error",error)
                    if(error.response){
                        for(const property in error.response.data){
                            this.errors.push(`${property} : ${error.response.data[property]}`)
                        }
                        console.log(JSON.stringify(error.response.data))
                    }else if(error.message){
                        this.errors.push('Somethimg went wrong. please try again')
                        console.log(JSON.stringify(error))

                    }
                })
                this.$store.commit('setIsLoading', false)
            }

        }
    }
}
</script>