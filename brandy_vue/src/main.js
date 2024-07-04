import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
// import CKEditor from '@ckeditor/ckeditor5-vue'
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice';
axios.defaults.baseURL = 'http://127.0.0.1:8000'
createApp(App).use(store).use(router,axios).use(ToastService).mount('#app')
