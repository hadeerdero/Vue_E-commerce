<template>
    <div class="page-sign-up">
        <div class="row">
            <div class="col-4 m-auto">
                <h1 class="title">Sign Up</h1>
                <form @submit.prevent="submitForm">
                    <div class="mb-3">
                        <label class="form-label">username</label>
                        <input v-model="username" class="form-control" type="text" placeholder="Username" aria-label="default input example">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Password</label>
                        <input v-model="password" class="form-control" type="password" placeholder="Password" aria-label="default input example">
                      </div>
                      <div class="mb-3">
                        <label class="form-label">Repeat password</label>
                        <input v-model="password2" class="form-control" type="password" placeholder="Repeat password" aria-label="default input example">
                      </div>
                      <div class="p-3 mb-2 bg-danger text-white" v-if="errors.length">
                        <p v-for="error in errors" :key="error">{{error}}</p>
                      </div>
                      <div class="mb-3">
                       <div>
                        <button class="btn btn-dark ">Sing Up</button>
                      </div>
                      </div>

                      <hr>
                     or  <router-link to="/log-in">click here</router-link> to log in
                </form>
            </div>
        </div>

    </div>
</template>
<script>
import axios from 'axios';
// import Password from 'primevue/password';
export default {
    name:'SignUp',
    data(){
        return{
            username:'',
            password:'',
            password2:'',
            errors:[]
        }
    },
    methods:{
        async submitForm(){
            this.errors = []
            if(this.username === ''){
                this.errors.push('The username is missing')
            }
            if(this.password === ''){
                this.errors.push('The password is missing')
            }
            if(this.password !==this.password2 ){
                this.errors.push('The password dosen\'t match')
            }
            if(!this.errors.length){
                const formData = {
                    username : this.username,
                    password : this.password
                }
                await axios.post("/api/v1/users/",formData)
                .then(res=>{
                    this.$router.push("/log-in")
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