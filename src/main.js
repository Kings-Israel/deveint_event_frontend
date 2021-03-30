import Vue from 'vue'
import App from './App.vue'
import axios from 'axios'
import Vuesax from 'vuesax'
import router from './router'
import store from './store'
import 'vuesax/dist/vuesax.css'
import 'material-icons/iconfont/material-icons.css';
import 'vue2-timepicker/dist/VueTimepicker.css';


axios.defaults.withCredentials = true
axios.defaults.baseURL = 'http://events.test'
Vue.use(Vuesax)
Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App),
}).$mount('#app')
